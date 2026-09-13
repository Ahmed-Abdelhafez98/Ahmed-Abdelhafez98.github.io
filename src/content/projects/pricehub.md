---
title: "PriceHub: aggregating product prices from three providers with NestJS and Prisma"
summary: "A NestJS service that polls providers with different payload shapes, normalises them into PostgreSQL, records price history only on change, and streams updates over Server-Sent Events."
period: "Feb 2026"
pubDate: 2026-02-28
stack: ["TypeScript", "NestJS", "Prisma", "PostgreSQL", "SSE", "Docker"]
repo: "https://github.com/Ahmed-Abdelhafez98/PriceHub"
featured: true
order: 2
---

PriceHub collects pricing and availability for digital products from several external providers, normalises the data into one schema, stores it in PostgreSQL with a price history, and serves it through a filtered REST API and a live Server-Sent Events stream. It is built with NestJS, Prisma 6 and PostgreSQL, documented with Swagger, and runs with a single `docker-compose up`.

## The flow

1. Three **simulated providers** live inside the app as controller endpoints, each with a deliberately different payload shape. Their prices and availability mutate every five seconds so there is always something changing.
2. An **aggregation service** polls all providers concurrently every 30 seconds, normalises each response, upserts products into PostgreSQL and writes a price-history row only when the price or availability actually changed.
3. A **products API** serves the result with filtering by name, availability, price range and provider, plus pagination and a `/products/changes?since=` endpoint for incremental sync.
4. An **SSE stream** at `/events/products` pushes updates to a small HTML dashboard.

## Decisions worth explaining

**Three payload shapes on purpose.** Provider A is flat (`id`, `name`, `price`). Provider B nests everything (`details.title`, `pricing.amount`, `inStock`). Provider C renames everything (`sku`, `productName`, `cost`, `isAvailable`). A `NormalizerService` maps each into one `NormalizedProduct` interface before anything else sees the data, so the rest of the system has exactly one shape to reason about.

**Concurrent fetch with independent failure.** Providers are fetched with `Promise.allSettled` and exponential-backoff retries, so a slow or failing provider never blocks the others. Products not seen within a configurable threshold are marked `isStale`, a flag that survives restarts and clears on the next successful fetch.

**Upsert with change detection.** Products are keyed by the composite `(externalId, provider)`. Before writing, the service compares the stored price and availability with the incoming values and appends to `PriceHistory` only on a real change. That keeps the history table meaningful rather than a log of polls.

**Rate limiting from the start.** `@nestjs/throttler` is applied globally at 100 requests per minute so the API surface is protected before anyone asks for it.

## Trade-offs I chose knowingly

Polling is simpler than webhooks for a simulated setup; in production I would want webhooks or a queue. Running providers in-process keeps the demo self-contained but is not how it would scale. Single-process aggregation means no distributed locking; with more than one instance I would move the job to BullMQ so only one worker polls at a time.

## Testing

Unit tests cover the normaliser for all three shapes, the aggregation upsert and history logic, product filtering and pagination, and provider mutation safety. End-to-end tests run against a real PostgreSQL.

Everything is configurable through environment variables: fetch interval, stale threshold, retry count and delay, throttle window and limit. The [README](https://github.com/Ahmed-Abdelhafez98/PriceHub#readme) has the full table.
