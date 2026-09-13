---
title: "Taskflow: a task management API with roles and dependency graphs"
summary: "A Laravel REST API where managers assign tasks, users work them, and task dependencies are enforced with circular-dependency prevention. Docker one-command setup, CI on every pull request."
period: "Jul 2025"
pubDate: 2025-07-14
stack: ["PHP 8.2", "Laravel", "Sanctum", "MySQL", "Docker", "GitHub Actions"]
repo: "https://github.com/Ahmed-Abdelhafez98/Taskflow"
featured: false
order: 7
---

Taskflow is a RESTful task management API built with Laravel. Two things make it more than a to-do list: **role-based access control** with distinct manager and user permissions, and **task dependencies** that form a graph the API refuses to make circular.

## What it does

- **Authentication** with Laravel Sanctum tokens. Seeded users include a manager with full access and a regular user who can only work tasks assigned to them.
- **Role-based access control.** Managers create, update, delete and assign tasks and add dependencies. Users can update the status of their own tasks and nothing else. The rules live in policies, not in controllers.
- **Task dependencies.** A task can depend on others and cannot be completed until they are. Adding a dependency runs a cycle check first, so A → B → A is rejected with a clear error rather than creating a task that can never be finished.
- **Filtering** on the task list by status, assignee and date range.
- **Docker-ready.** One script sets up the environment, starts the containers, installs dependencies, migrates and seeds the database and runs the test suite to prove the setup worked.

## Testing and CI

The suite has 59 tests covering authentication, task CRUD, role enforcement and the dependency rules, including the circular case. A GitHub Actions workflow runs it on every push and pull request against PHP 8.2 and a real MySQL 8 service, with Composer caching and a security audit of dependencies. Nothing merges red.

## Design notes

The dependency check is the piece I spent the most time on. The naive approach, "does B already depend on A", only catches direct cycles. The implemented check walks the dependency graph from the proposed dependency and refuses if it reaches the task being edited. Tasks are small enough that a depth-first walk is fine; for a very large graph I would store a closure table instead.

The project also includes an entity-relationship diagram and a Postman collection under `docs/`, because an API that is easy to explore gets used correctly.

Source and setup instructions are in the [repository](https://github.com/Ahmed-Abdelhafez98/Taskflow).
