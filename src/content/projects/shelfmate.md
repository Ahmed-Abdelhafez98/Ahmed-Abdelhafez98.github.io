---
title: "Shelfmate: a reading-shelf app in React"
summary: "Organise books into Currently Reading, Want to Read and Read shelves, and search a catalogue to add more. Built on the Udacity MyReads project during the FWD React track."
period: "Aug 2021"
pubDate: 2021-08-23
stack: ["React", "React Router", "JavaScript"]
repo: "https://github.com/Ahmed-Abdelhafez98/Shelfmate"
featured: false
order: 12
---

Shelfmate is my implementation of the Udacity **MyReads** project, built in August 2021 as part of the FWD React Nanodegree track. It is a single-page React app with two screens: a main page that shows your books across three shelves, and a search page for finding books in the catalogue and adding them to a shelf.

## What it does

- Three shelves: **Currently Reading**, **Want to Read** and **Read**. Each book has a shelf selector that moves it between shelves or removes it.
- A **search page** that queries the provided books API with a whitelisted set of search terms and shows results with the same shelf selector, so a book already on a shelf shows its current shelf in the results.
- Client-side routing between the two pages with React Router.

## What I learned

It was the project where React's data flow clicked. State for the shelves lives in the top-level component and is passed down as props with callbacks passed back up; the search page reads the same state so its results stay consistent with the main page. The component split, `ListBooks`, `BookCategory`, `SearchBooks` and a `Book` component shared by both pages, is the standard one for a reason.

Source in the [repository](https://github.com/Ahmed-Abdelhafez98/Shelfmate). The related coding exercises from the same track are in [ReactND-Coding-Practice](https://github.com/Ahmed-Abdelhafez98/ReactND-Coding-Practice).
