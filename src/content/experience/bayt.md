---
title: "A year on Bayt.com's job platform: PHP, Yii and an AI CV enhancer"
company: "Bayt.com"
role: "Software Engineer"
location: "Dubai, UAE (Remote)"
period: "Mar 2021 – Dec 2021"
pubDate: 2022-01-05
summary: "My first engineering role, working remotely on a large-scale job platform in PHP and Yii, with a Python-backed AI feature for improving CVs."
---

In March 2021, a few months before graduating, I joined **Bayt.com** as a remote software engineer. Bayt is one of the largest job platforms in the Middle East, connecting employers and job seekers, and for me it was the first time working on a system with real scale, real users and a codebase far older than anything I had touched before.

## The work

The backend was primarily **PHP** on the **Yii** framework, with **Python** used for data and machine-learning work. My responsibilities were the everyday work of a platform team:

- Developing and maintaining backend features that employers and job seekers used every day.
- Keeping those features fast and correct as they were exercised by a large user base.
- Working with the data layer: **PostgreSQL** for transactional data, **ClickHouse** for analytics queries, and **Redis** for caching.

Coming from a Laravel background, Yii was familiar enough to be productive quickly and different enough to be instructive. Seeing a second framework's opinions about the same problems, routing, ORM, validation, made it clearer which ideas were fundamental and which were just conventions.

## The AI CV enhancement feature

The piece of work I remember most was an **AI-powered CV enhancement feature** intended to improve the quality of matches between candidates and jobs. The idea was that a better-structured, more complete CV gives the matching engine better signal, so helping candidates improve their CV improves outcomes on both sides of the marketplace.

This was my first time shipping something that combined a conventional web backend with a model-backed component: the request flow, the latency budget, the fallbacks when the model is slow or wrong, and how to present suggestions without overriding what the candidate actually wrote. Those concerns came back years later when I started building agent-based systems, and the instincts were formed here.

## Working remotely, early

I was in Egypt; the team was in Dubai. In 2021 fully remote work was still a new arrangement for many teams, and the year taught me the habits that made it work: writing things down, over-communicating status, and making pull requests that explain themselves so a reviewer in a different time zone can move without waiting for me.

## Alongside the job

I graduated in June 2021 while working, and I kept building on the side to fill gaps the job did not cover. That year produced a restaurant discovery app in Node.js, an Angular search app, a React reading-shelf app built on the Udacity MyReads project, and, near the end of the year, **Hobbies**, a Laravel and Vue social network. They are all on the [projects page](/projects/).

## Leaving

I left Bayt in December 2021 to join Trufla, where I would spend the next four years going deep on one product. Bayt gave me the thing a first job should: exposure to a large system, the discipline of not breaking it, and a first taste of building product features on top of machine learning.
