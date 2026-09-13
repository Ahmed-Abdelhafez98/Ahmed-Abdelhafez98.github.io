---
title: "CampSpot: a camping community with maps, reviews and photo uploads"
summary: "A Node.js and Express web app where campers share campgrounds on a map, upload photos and leave reviews, with Passport authentication and a hardened input layer."
period: "Jan 2024 – Jul 2024"
pubDate: 2024-07-04
stack: ["Node.js", "Express", "MongoDB", "Mongoose", "Passport", "Cloudinary", "Mapbox", "EJS"]
repo: "https://github.com/Ahmed-Abdelhafez98/CampSpot"
featured: true
order: 5
---

CampSpot is a community site for outdoor enthusiasts. You browse campgrounds on a map, open one to see photos and reviews, and if you have an account you can add your own campgrounds, upload photos and rate other people's. I built it over the first half of 2024 as a full-stack Node.js project, and it ended up being a good tour of everything a small content site needs beyond CRUD.

## Features

- **Campground listings** with a cluster map of all campgrounds and a location map on each detail page, both via Mapbox.
- **Create, edit and delete** your own campgrounds, with image uploads stored on Cloudinary through `multer-storage-cloudinary`.
- **Reviews with star ratings**, owned by the reviewing user; you can only delete your own.
- **Authentication** with Passport's local strategy and `passport-local-mongoose`, session-backed with flash messages for feedback.
- **Server-side validation** with Joi schemas for every campground and review payload.
- **Hardening**: Helmet for headers, `express-mongo-sanitize` against operator injection, and `sanitize-html` on user-provided text.
- A **seed script** that populates sample campgrounds with real coordinates so the map is never empty in development.

## Structure

The app follows a conventional MVC split: `models/` for Mongoose schemas, `controllers/` for request handling, `routes/` for wiring, `views/` for EJS templates with `ejs-mate` layouts, and a `middleware.js` that holds the authorisation checks, such as "is the current user the author of this campground". Keeping those checks in one place made it easy to see, and test, exactly who could do what.

## What I took from it

The most useful lesson was about **ownership checks**. It is tempting to hide the delete button for non-owners and call it done; the real check is the middleware that refuses the request. The second was about **input hygiene**: MongoDB query-operator injection is a real risk when request bodies flow into queries, and a small sanitiser at the edge closes it.

The [repository](https://github.com/Ahmed-Abdelhafez98/CampSpot) has setup instructions and the list of environment variables needed for Cloudinary and Mapbox.
