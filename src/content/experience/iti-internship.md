---
title: "Three months at ITI: from CRUD apps to a graduation project"
company: "ITI – Information Technology Institute"
role: "Web Developer Intern"
location: "Alexandria, Egypt"
period: "Jun 2020 – Sep 2020"
pubDate: 2020-10-01
summary: "An intensive summer web track in JavaScript, PHP, Laravel and MySQL that ended with a graduation project scored at 100%."
---

In the summer of 2020, between my third and fourth year of computer science, I joined the web development track at the Information Technology Institute in Alexandria. It was my first structured, full-time exposure to building for the web, and it set the direction for everything that followed.

## What the track covered

The programme was deliberately dense. Over roughly three months we worked through:

- **JavaScript** on the client, from DOM basics to structuring a small front end without a framework.
- **PHP** as the server language, first plain and then with **Laravel**, which was my introduction to routing, controllers, Eloquent and Blade.
- **MySQL** for persistence: schema design, joins, indexes, and how a badly modelled table shows up later as slow pages.

The rhythm was lectures in the morning and a build task in the afternoon. Most of those tasks were CRUD applications, which sounds unglamorous but is exactly where the fundamentals live: validation, sessions, authentication, and the boundary between what the browser is allowed to say and what the server must check.

## The graduation project: WebPattern

The track ended with a graduation project. Mine was **WebPattern**, a blog for posts about web technologies with an admin panel where a moderator approves posts and comments before they appear publicly. It had user registration and login, categories, per-author pages, search, and a separate admin area for managing posts, comments, categories and users.

It was built in plain PHP with MySQL, no framework, which was the point. Doing routing, database access and session handling by hand made it obvious what Laravel does for you when you use it afterwards. The project scored **100%**.

The [source is on GitHub](https://github.com/Ahmed-Abdelhafez98/WebPattern), and there is a [separate write-up](/projects/webpattern/) about it.

## What I took away

Three things stuck:

1. **Server-side validation is the real validation.** Everything on the client is a convenience.
2. **Schema first.** The projects that went smoothly were the ones where I drew the tables before writing a line of PHP.
3. **Ship the boring version.** The CRUD apps that worked end to end taught me more than the ambitious ones that were half-finished.

## What came next

The internship ended in September 2020 and I went straight into self-study on the Node.js side to see the same ideas from a different runtime. That produced a run of small projects over the following months: a weather site, a task-manager API with tests, and a Socket.io chat app. They were all direct continuations of the habits ITI drilled in, and they are all on the [projects page](/projects/).
