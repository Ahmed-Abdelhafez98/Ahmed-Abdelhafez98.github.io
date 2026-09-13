---
title: "Serving a Yii app's assets through a CDN with a custom asset manager"
summary: "Extending Yii's AssetManager so static assets are served from a CDN domain with stable folder names, with a local Nginx setup that simulates the CDN in Docker."
period: "Jun 2024"
pubDate: 2024-06-06
stack: ["PHP", "Yii", "Nginx", "Docker"]
repo: "https://github.com/Ahmed-Abdelhafez98/yii-cdn-integration"
featured: false
order: 9
---

This is a small, focused project: make a Yii application serve its static assets from a CDN, and prove it works locally without paying for a CDN. I had worked with Yii at Bayt.com and wanted to write up the pattern cleanly.

## The problem

Yii's default `AssetManager` publishes assets into a folder with a randomly generated name and serves them from the application host. That is fine for a single server, but it defeats caching at a CDN: the folder name changes between deploys, so every deploy invalidates every asset URL, and the origin still serves all the traffic.

## What I built

1. **A custom asset manager** that extends Yii's `AssetManager`, configured with a CDN domain and a static folder name. It overrides `getAssetUrl` so published assets get stable URLs on the CDN host.
2. **Application configuration** that swaps the default manager for the custom one, so no view code changes.
3. **A test page** that includes CSS and JavaScript assets, so you can see in the browser's network tab that they are fetched from the CDN host.
4. **A local CDN in Docker**: Nginx configured as a reverse proxy and cache in front of the Yii app, wired together with Docker Compose. `docker-compose up --build`, then open the test page.

## Why it is written the way it is

The README spends time on the object-oriented reasoning because the project was partly an exercise in explaining it: the CDN behaviour is **encapsulated** in one class, the class **inherits** everything else from the framework, and overriding one method changes behaviour without changing the contract. Small projects are a good place to be explicit about that.

The [repository](https://github.com/Ahmed-Abdelhafez98/yii-cdn-integration) has the Docker setup and the step-by-step explanation.
