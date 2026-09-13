---
title: "Platter: discover restaurants near you and leave a review"
summary: "A Node.js and Express web app for finding restaurants near you or in any place, viewing details, adding new ones with photos, and leaving reviews."
period: "Apr 2021 – May 2021"
pubDate: 2021-05-01
stack: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS", "Cloudinary"]
repo: "https://github.com/Ahmed-Abdelhafez98/Platter"
featured: false
order: 14
---

Platter is a restaurant discovery site from spring 2021: browse restaurants, open one to see its details and reviews, add a new restaurant with photos, and leave a review of your own. I built it just after starting at Bayt.com, and it was my first Node.js project with image uploads and a real data model rather than a single collection.

## What it does

- **List and detail pages** for restaurants, rendered server-side with EJS and `ejs-mate` layouts.
- **Create restaurants** with photo uploads stored on Cloudinary.
- **Reviews** attached to restaurants through a separate Mongoose model.
- A **seed script** to populate sample data.

## What I learned

Two models with a relationship between them, `Restaurant` and `Review`, was the step up from the single-collection apps I had built before. It is where I learned Mongoose population, cascading deletes when a restaurant is removed, and why you validate on the server even when the form already does. Platter was the direct ancestor of [CampSpot](/projects/campspot/), which took the same shape and added authentication, maps and hardening.

Source in the [repository](https://github.com/Ahmed-Abdelhafez98/Platter).
