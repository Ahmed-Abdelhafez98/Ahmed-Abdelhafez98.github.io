---
title: "What I'm building at Uptal: the backend behind Etch"
company: "Uptal"
role: "Senior Software Engineer"
location: "Riyadh, Saudi Arabia (Remote)"
period: "Jan 2026 – Present"
pubDate: 2026-08-13
summary: "Seven months in: owning the backend architecture, an AI import pipeline and the Kubernetes infrastructure for Etch, a location-based social platform."
---

In January 2026 I joined **Uptal** as a Senior Software Engineer to lead backend work on **Etch**, a location-based social platform that connects creators with their audience through curated lists of places. Seven months in, this is a snapshot of what the work has looked like and the technical decisions I have been responsible for.

## The shape of the system

Etch has a mobile app, a web app and an admin portal, all served by a backend I own end to end. The main pieces:

- An **Express and TypeScript API** deployed on **Azure Kubernetes Service**, which the mobile app talks to for anything that mutates data.
- **Firebase** for authentication and storage, with **Firestore** as the original system of record.
- **PostgreSQL** as the relational store that an increasing share of the data now lives in.
- An **event-driven serverless layer on Firebase Cloud Functions**, written in TypeScript, for the things that should happen in reaction to data changes: push notifications on follows, likes, saves and comments; keeping the search index in sync; maintaining counters.
- **Algolia** for full-text search over lists, places and users, kept current by those triggers.
- A **direct-messaging service** over WebSockets.

## The AI import pipeline

The feature that defines the product is import: a user pastes a link, some text, a video or an image, and Etch turns it into a list of real places with coordinates, categories and photos. I architected this as a **multi-stage pipeline** rather than a single call, because each stage fails differently and needs different retry behaviour:

1. **Fetch and scrape** the source, which varies wildly between a blog post, a short video and a screenshot.
2. **Extract candidate places** with an LLM, constrained to output a strict schema.
3. **Resolve** each candidate against a places provider to get a canonical identity, coordinates and opening hours, with normalisation rules for addresses in the region we serve.
4. **Enrich and publish** the list, then notify the user.

The stages run as background workers with their own queues, so a slow video transcription does not block a quick URL import, and a failure in resolution can be retried without re-running extraction. Getting the schema at the boundary of the LLM stage right was most of the work: the model is allowed to be creative about *reading*, never about the *shape* of what it returns.

## Migrating from Firestore to PostgreSQL

The largest ongoing project is moving the core data model from Firestore to PostgreSQL. Firestore was the right choice to launch fast, but relational questions such as "which of my friends saved places in this city" are awkward and expensive in a document store.

I planned the migration in **waves**, one domain at a time: places first, then lists, then users and their relationships. Each wave follows the same lifecycle. Build the new tables and a dual-write path, backfill and reconcile, flip reads behind a flag, watch, then delete the old path. The rule I hold the team to is that a wave is not done until the Firestore code for that domain is *gone*, not merely unused. Half-migrated systems are the most expensive kind.

## Infrastructure and delivery

I built the **CI/CD pipeline on GitHub Actions**: every merge builds a Docker image and rolls it out to the Kubernetes cluster, with **cert-manager** issuing and renewing TLS certificates automatically and **Cloudflare** in front of the origin. Development and production run in separate clusters and separate Firebase projects, and promoting a change is a merge, not a manual step.

## What I have learned so far

- **A platform team of one still needs a process.** Writing down the cutover checklist for wave one is why waves two and three were uneventful.
- **Put the schema at the LLM boundary, not after it.** Validating model output against a strict type at the moment it is produced removes a whole class of downstream bugs.
- **Delete the old path.** Every feature flag I left in place longer than necessary eventually cost more than the migration it protected.

The work continues, and I will write a fuller account when the migration is complete.
