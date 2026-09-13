---
title: "Quicklist: a live-filtering search list in Angular"
summary: "A small Angular 12 app that filters a list of artists as you type using a custom pipe, with a details route per item."
period: "Jun 2021"
pubDate: 2021-06-19
stack: ["Angular 12", "TypeScript", "RxJS", "Bootstrap"]
repo: "https://github.com/Ahmed-Abdelhafez98/Quicklist"
featured: false
order: 13
---

Quicklist is a compact Angular app from June 2021. It shows a list of artists, filters the list live as you type, and opens a details view for any item. I built it to learn Angular's way of doing things after working mostly in React and server-rendered templates.

## What it does

- A **search box** bound to the list through a custom `searchArtists` pipe, so filtering is declarative in the template rather than imperative in the component.
- **Two routes**: the list and a details page per artist, wired through the Angular router.
- **Bootstrap** styling through ng-bootstrap.
- Unit test scaffolding with Karma and Jasmine, including a spec for the pipe.

## What I learned

Pipes are the piece of Angular I liked most. Putting the filter in a pure pipe kept the component free of filtering logic and made it trivially testable. The rest, modules, dependency injection, decorators, was a useful contrast with React's lighter structure and made me better at reading Angular codebases later.

Source in the [repository](https://github.com/Ahmed-Abdelhafez98/Quicklist).
