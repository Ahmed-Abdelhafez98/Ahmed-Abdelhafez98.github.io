---
title: "Skycast: weather by place name or by where you are"
summary: "A weather site that geocodes any place you type through Mapbox and shows the current weather, or uses the browser's location with one click. Node.js, Express and Handlebars."
period: "Oct 2020 – Jan 2021"
pubDate: 2021-01-06
stack: ["Node.js", "Express", "Handlebars", "Mapbox"]
repo: "https://github.com/Ahmed-Abdelhafez98/Skycast"
featured: false
order: 16
---

Skycast is a weather lookup site and the first Node.js project I built after finishing the ITI web track in autumn 2020. Type a city or an address, or click one button to use your device's location, and it shows the current weather.

## What it does

- **Search any place.** The address is geocoded with the Mapbox Geocoding API, then the coordinates are sent to a weather API.
- **Use my location.** The browser's Geolocation API supplies the coordinates directly.
- **Server-rendered pages** with Handlebars, plus a JSON endpoint at `/weather?address=` that the page calls, so the same backend could serve another client.

## How it is built

The server is Express with `hbs` views and two small utility modules: one for geocoding and one for the forecast, each wrapping an HTTP call and normalising the response. Errors from either service are turned into a plain message in the JSON response rather than a stack trace. The Mapbox token is read from the `MAPBOX_TOKEN` environment variable.

## What I learned

Chaining two third-party APIs, geocoding then weather, and handling the failure of either one cleanly was the core lesson. It is a tiny project, but "call a service, validate what came back, call the next one" is the shape of a lot of backend work, and this is where I first wrote it deliberately.

Source in the [repository](https://github.com/Ahmed-Abdelhafez98/Skycast).
