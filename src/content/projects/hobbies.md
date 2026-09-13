---
title: "Hobbies: a social network for sharing what you love, in Laravel and Vue"
summary: "A full-stack social app where people post hobbies with photos, tag them, and discover new hobbies through tags. Laravel 8 on the back, Vue 2 on the front."
period: "Nov 2021 – Dec 2021"
pubDate: 2021-12-29
stack: ["PHP", "Laravel 8", "Vue 2", "Bootstrap", "MySQL", "Blade"]
repo: "https://github.com/Ahmed-Abdelhafez98/Hobbies"
featured: true
order: 6
---

Hobbies is a small social network built around a single idea: post the things you love doing, tag them, and find people and hobbies through those tags. I built it in the last two months of 2021, right as I was moving from Bayt.com to Trufla, as a way to put a full Laravel and Vue stack together end to end.

## What it does

- **Hobby posts** with a title, a description and image uploads, created and managed by their owner.
- **Tags.** Any hobby can carry tags, and a tag page lists every hobby under it, which is how discovery works.
- **Attach and detach tags** on your own hobbies, protected by authentication.
- **User profiles** with avatars.
- **Swagger UI** at `/swagger` describing the API surface.

## How it is built

The backend is **Laravel 8** with resource controllers for hobbies, tags and users, and a dedicated controller for the hobby-to-tag relationship. Authentication uses Laravel's standard scaffolding. Images are stored through Laravel's filesystem with a public symlink.

The front end is server-rendered **Blade** with **Vue 2** components mounted where interactivity is needed, styled with **Bootstrap 4**. This was the mainstream Laravel setup of the time, and it is still a productive one: full page loads for navigation, Vue for the parts of a page that change without a reload.

## What I learned

This was my first time modelling a proper many-to-many relationship with behaviour attached to it, and the attach/detach endpoints taught me to treat a pivot as something with its own routes and authorisation rather than as a side effect of saving a form. It was also my first project with real image uploads, which is where I learned to think about storage paths, public access and cleanup of orphaned files.

The [repository](https://github.com/Ahmed-Abdelhafez98/Hobbies) has local setup instructions.
