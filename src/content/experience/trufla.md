---
title: "Four years at Trufla: rebuilding an insurance SaaS backend in NestJS"
company: "Trufla"
role: "Software Engineer"
location: "Cairo, Egypt"
period: "Dec 2021 – Jan 2026"
pubDate: 2026-02-05
summary: "Building and then rebuilding the backend of a B2B insurance SaaS platform serving 60+ enterprise clients: NestJS, microservices on AWS, and a CI/CD overhaul."
---

I joined **Trufla** in December 2021 and stayed four years, which is long enough to see a system through several lives. Trufla builds B2B software for the insurance industry, and the platform I worked on served **more than 60 enterprise clients**, each with their own data, their own configuration and their own tolerance for downtime, which was low.

## Year one: learning the domain and keeping the lights on

Insurance software is a domain-heavy problem. Policies, brokers, carriers, renewals, quotes, and the rules that connect them are not things you can guess; you have to learn them from the people who use the product. Much of my first year was spent maintaining and extending the existing backend while building that understanding.

The practical output of that period was a long series of **database migrations**, more than 50 across the four years, spanning both **MySQL** and **MongoDB**, written in **Node.js** and **Laravel** depending on which service owned the data. Migrations against live enterprise data teach you a specific kind of caution: every one needs a rollback plan, a dry run, and a way to verify the result that does not involve trusting the migration itself.

## The rebuild: NestJS from scratch

The biggest project of my time there was **rebuilding the backend from scratch in NestJS**. The existing codebase had grown organically and was becoming expensive to change safely. The rebuild was an opportunity to apply structure from day one:

- **Modular architecture.** Each domain area became its own NestJS module with explicit boundaries, so a change to quoting could not silently break renewals.
- **DTO validation at the edge.** Every request body passes through a typed DTO with class-validator rules before it reaches business logic. Bad input fails fast with a clear error instead of surfacing three layers deep.
- **Dependency injection everywhere,** which made the service layer testable without spinning up the whole application.

Rebuilding a system that is already in production, with clients depending on it, is mostly a sequencing problem. The technical work matters, but so does deciding what moves first, how the two systems coexist, and how you prove parity before you switch.

## Microservices on AWS

Alongside the rebuild I designed and implemented **several microservices on AWS**, each with its own database and security layer. The pattern was to carve out the pieces with clearly different scaling or isolation needs, rather than to split for its own sake. Each service owned its data, exposed a narrow contract, and enforced authentication and authorisation at its own boundary rather than trusting the caller.

## CI/CD: 70% less review effort, 50% faster deploys

The change that paid off most consistently was **automating CI/CD**. Before, reviews involved a lot of manual checking and deployments were slow and hands-on. After building the pipeline, with automated tests, linting and type checks on every pull request and a repeatable deployment path, **review effort dropped by roughly 70% and deployment time by roughly 50%**. Reviewers could focus on design rather than on whether the build passed, and shipping stopped being an event.

## What four years taught me

- **Boring infrastructure is a feature.** Predictable pipelines and repeatable migrations are what let a small team serve 60 enterprise clients.
- **Structure is cheapest at the start.** Every module boundary and DTO we defined in the rebuild saved time later; every one we skipped cost time later.
- **Talk to the people who use it.** The best backend decisions I made at Trufla came from understanding a broker's day, not from a framework's documentation.

## Side projects along the way

Working on one product for four years is deep but narrow, so I used side projects to stay broad: a Ruby on Rails chat API with Elasticsearch search, a Yii CDN integration experiment, a Node.js camping community app, a Laravel task API with role-based access, and a LangChain agent runner. They are all on the [projects page](/projects/).

## Leaving

I left Trufla in January 2026 to join Uptal as a Senior Software Engineer, taking ownership of backend architecture and infrastructure for a new product. Trufla is where I became a backend engineer rather than someone who writes backend code, and I am grateful for every one of those four years.
