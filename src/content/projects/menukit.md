---
title: "MenuKit: a multi-tenant menu management API in Laravel"
summary: "A REST API for restaurant menus with hierarchical categories, multi-dimensional variants and modifiers, where tenant isolation is enforced in five layers and money never touches a float."
period: "Jun 2026"
pubDate: 2026-06-11
stack: ["PHP 8.3", "Laravel", "Sanctum", "SQLite", "Pest"]
repo: "https://github.com/Ahmed-Abdelhafez98/MenuKit"
featured: true
order: 1
---

MenuKit is a self-contained Laravel module that exposes a REST API for managing restaurant menus on a multi-tenant platform. The brief sounds simple: categories, menu items, variants, modifiers. The interesting parts are the two constraints that sit underneath it: **menu data must never leak across restaurants**, and **prices must be exact**.

It ships with 134 tests and 456 assertions, runs on SQLite with no database server, and generates OpenAPI docs directly from the request and resource classes.

## The data model

```
restaurants ─┬─ categories ──── menu_items ─┬─ variant_attributes ── values
             ├─ modifiers ←─(many-to-many)──┤
             └─ users                       └─ variants
```

**Variants are dimensions, not a flat list.** An item owns attributes such as "Size" and "Crust", each attribute owns values such as "Small" and "Thin", and a variant is one sellable combination with its own absolute price and availability. A client posts `{"price": "35.00", "values": [{"attribute": "Size", "value": "Medium"}, {"attribute": "Crust", "value": "Thin"}]}` and the attribute and value rows are created on first use. A variant's identity is its sorted set of value ids, stored as a unique `combination_key`, so a duplicate combination is rejected with a 422 regardless of order, casing or whitespace.

**Variant prices are absolute; modifiers are deltas.** Small is 25, Medium is 35, Large is 45, never "base plus 10". Modifiers are the only signed deltas, which is what makes discounts possible. Responses expose `price_from`, the cheapest orderable variant, so clients never recompute it.

**Availability composes.** An item flag and a variant flag combine into `orderable = item.is_available AND variant.is_available`. Turning an item off hides everything; turning one variant off greys it out alone. The API returns both raw flags and the computed result so no client re-derives the rule.

**Money is integers end to end.** Columns are `*_cents`, a `Money` value object wraps them, and the API speaks decimal strings parsed with integer string arithmetic. The minor-unit exponent comes from the restaurant's currency, so JPY has none and KWD has three. `Money::add()` refuses mismatched currencies.

## Multi-tenancy in five layers

The tenant is never read from a request body. `ResolveTenant` middleware derives it from the authenticated Sanctum user into a request-scoped `TenantContext`, and then:

1. **Reads** go through a `BelongsToTenant` trait that boots a global scope adding `WHERE restaurant_id = current`. A guard test fails the suite if any tenant-owned model drops the trait.
2. **Writes** are force-stamped with the tenant in the `creating` hook; a forged id in the body is overwritten, and a test proves it.
3. **Route bindings** happen after the tenant is resolved, so a foreign id is a 404 before any controller code runs. Existence is never revealed with a 403.
4. **Body references** such as `category_id` validate with tenant-scoped `exists` rules, so cross-tenant references fail as 422.
5. **Policies** check ownership again behind the scope, so a future regression in the scope degrades to a 403 rather than a leak.

## Structure

Everything domain-specific lives in `modules/Menu` with its own models, migrations, routes, actions, requests, resources, policies and tests, registered by one service provider. Controllers hold no business logic: validate through a Form Request, call one single-purpose Action, return an API Resource. Actions are unit-tested without HTTP.

## What I would add for production

Composite foreign keys on `(restaurant_id, id)` so the database itself rejects cross-tenant parents, with row-level security on Postgres as a backstop. Tenant resolution from a verified token claim rather than a mutable user column. A single, logged escape hatch for admin tooling instead of scattered `withoutGlobalScope` calls. Per-token rate limiting across the whole API rather than only on token issuance.

The full endpoint table and the reasoning behind each decision are in the [README](https://github.com/Ahmed-Abdelhafez98/MenuKit#readme).
