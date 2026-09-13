---
title: "Tasko: a task manager REST API with JWT auth and a full test suite"
summary: "The backend for a personal task manager: accounts with JWT authentication, per-user tasks with filtering and pagination, avatar uploads, and email notifications, with Jest and Supertest tests on every route."
period: "Oct 2020 – Apr 2021"
pubDate: 2021-04-30
stack: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Jest", "SendGrid"]
repo: "https://github.com/Ahmed-Abdelhafez98/Tasko"
featured: false
order: 10
---

Tasko is a REST API for a personal task manager. There is no front end; the point of the project was to build a complete, tested backend. I started it in October 2020, a month after finishing the ITI web track, and it was the project where I learned to write tests for every route rather than clicking through Postman.

## Endpoints

| Area | Routes |
|---|---|
| Accounts | sign up, log in, log out, log out everywhere, read/update/delete profile |
| Avatars | upload (resized with sharp), remove, fetch by user id |
| Tasks | create, list with `completed`, `limit`, `skip` and `sortBy` query options, read, update, delete |

Every task route and every profile route requires a bearer token. Users only ever see their own tasks.

## How it is built

- **Authentication** with JSON Web Tokens stored per device, so logging out one device does not log out the others, and "log out everywhere" clears them all. Passwords are hashed with bcrypt.
- **Ownership** is enforced at the query level: task lookups always include the owner id, so there is no code path that can return someone else's task.
- **Avatar uploads** go through multer with a size and type filter, then sharp resizes them to a fixed square before they are stored.
- **Emails** on sign-up and account deletion through SendGrid.
- **Tests** with Jest and Supertest against a separate test database, using fixtures for users and tasks. Every route has at least one success and one failure case.

## What I learned

Writing the test suite first for a few routes and then for the rest changed how I built the remaining ones: smaller handlers, clearer error codes, and fewer surprises. The multi-token logout design was also the first time I thought carefully about sessions across devices.

Source in the [repository](https://github.com/Ahmed-Abdelhafez98/Tasko).
