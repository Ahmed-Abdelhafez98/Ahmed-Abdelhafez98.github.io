---
title: "Unlimited-Talk: a multi-application chat API in Ruby on Rails"
summary: "A chat backend where each registered application owns many chats and each chat many messages, with Elasticsearch search over messages, queued writes for concurrency, and full Docker Compose setup."
period: "Apr 2024"
pubDate: 2024-04-22
stack: ["Ruby", "Ruby on Rails", "Elasticsearch", "Sidekiq", "Redis", "Docker"]
repo: "https://github.com/Ahmed-Abdelhafez98/Unlimited-Talk"
featured: true
order: 4
---

Unlimited-Talk is a chat system designed as infrastructure rather than as an app: other applications register with it, and each application can host any number of chats, each with any number of messages. I built it in Ruby on Rails in April 2024, partly because I wanted a serious project in a language I did not use at work, and partly because the requirements were a good fit for a few tools I wanted to use properly: Elasticsearch, Sidekiq and Redis.

## Features

- **Application management.** Each application is created with a unique token that identifies it on every request.
- **Chats and messages** are numbered *within* their parent: chat number 3 of application X, message number 12 of that chat. Numbers are stable and human-readable, and they never collide across applications.
- **Search** over the messages in a chat by partial text match, backed by Elasticsearch.
- **Counts** of chats per application and messages per chat, maintained with minimal lag rather than computed on every read.
- **Concurrency.** Requests do not write to the database directly. Creation goes through queues, which is how the numbering stays correct when many clients create chats or messages at the same time.
- **Containerised** with Docker Compose. One install script and `docker-compose up` bring up the app and its dependencies, and `docker-compose exec app bundle exec rspec` runs the tests.

## The interesting problem: sequential numbers under concurrency

Giving each chat a per-application sequential number is easy with one writer and hard with many. Two requests arriving together must not both become chat number 7. The approach here is to hand the number out atomically from Redis and to push the actual persistence onto a Sidekiq queue. The client gets its number immediately; the row is written shortly after. The count fields are updated by the same background path, which is why they are "minimal lag" rather than instantaneous.

## Testing and tooling

The suite is RSpec. A Postman collection covering every endpoint is included so the API can be explored without reading the code.

The [repository](https://github.com/Ahmed-Abdelhafez98/Unlimited-Talk) has the setup script and the collection link.
