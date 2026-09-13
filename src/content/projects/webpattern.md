---
title: "WebPattern: a moderated tech blog in plain PHP, my ITI graduation project"
summary: "A blog and CMS for posts about web technologies, with an admin panel that approves posts and comments before they go live. Built in plain PHP and MySQL as my ITI graduation project, which scored 100%."
period: "Summer 2020 (published Nov – Dec 2021)"
pubDate: 2021-12-16
stack: ["PHP", "MySQL", "Bootstrap", "Vanilla JS"]
repo: "https://github.com/Ahmed-Abdelhafez98/WebPattern"
featured: false
order: 8
---

WebPattern was my graduation project for the web development track at ITI in the summer of 2020. The brief was a blog for posts about web technologies; the part I added was moderation. Registered users write posts and comments, but nothing appears publicly until an admin approves it. The project scored **100%**. I published and tidied the code on GitHub in late 2021.

## Features

- **Public blog:** posts by category, per-author pages, and full-text search.
- **Registration and login** for readers who want to post or comment.
- **Comments** on posts, held in a queue until approved.
- **Admin panel** with its own layout: manage posts, categories, comments, users, and the admin's own profile.
- **RTL-ready styling** with both LTR and RTL Bootstrap builds included.

## Why plain PHP

The track taught Laravel, but the graduation project was built without a framework on purpose. Doing routing, database access with MySQL, sessions and authentication by hand meant I understood each of those problems before a framework solved them for me. When I picked Laravel up again a year later for [Hobbies](/projects/hobbies/), everything it abstracted was something I had already written once.

## Structure

The public site is a set of PHP pages, `index.php`, `post.php`, `category.php`, `authorPosts.php`, `search.php`, sharing `includes/` for the database connection, header, footer, navigation, sidebar and login handling. The admin panel lives under `admin/` with its own `includes/` and `functions.php`.

## Looking back

There are things I would not do the same way now: business logic in page files, no migrations, and hand-rolled sessions. But the moderation flow, the ownership rules and the schema were sound, and building them without help is why the later, framework-based projects went quickly.

The [repository](https://github.com/Ahmed-Abdelhafez98/WebPattern) has run instructions.
