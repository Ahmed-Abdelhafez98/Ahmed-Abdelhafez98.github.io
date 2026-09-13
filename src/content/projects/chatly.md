---
title: "Chatly: real-time chat rooms with Socket.io"
summary: "A real-time chat app where you pick a name and a room and talk live with everyone in it, with a live user list, location sharing and a profanity filter."
period: "Nov 2020 – Jan 2021"
pubDate: 2021-01-06
stack: ["Node.js", "Express", "Socket.io", "Vanilla JS"]
repo: "https://github.com/Ahmed-Abdelhafez98/Chatly"
featured: false
order: 15
---

Chatly is a small real-time chat application built with Socket.io in the winter of 2020. It started as a task for a computer science course and became my first hands-on experience with WebSockets and event-driven servers.

## What it does

- **Rooms.** You enter a display name and a room; everyone in the same room sees each other's messages, and the room gets a notice when someone joins or leaves.
- **Live user list** per room, updated as people come and go.
- **Location sharing.** One click sends your coordinates as a Google Maps link to the room.
- **Profanity filter** on outgoing messages.

## How it is built

The server is Express serving static files plus a Socket.io server. A small `utils/` module tracks users per room and generates timestamped message objects. Events are `join`, `sendMessage`, `sendLocation` and `disconnect`, each with an acknowledgement callback so the client knows whether the action succeeded. The front end is plain JavaScript rendering templates into the page.

## What I learned

Socket.io's model of rooms, broadcasts and acknowledgements gave me a mental model for real-time systems that carried through to the WebSocket-based direct messaging I later worked on professionally. The user-tracking module also taught a simple lesson: keep the in-memory state in one place with a tiny API, and everything else stays simple.

Source in the [repository](https://github.com/Ahmed-Abdelhafez98/Chatly).
