---
title: "AgentRunner: a ReAct agent execution service on LangChain and Ollama"
summary: "A Python service that runs an LLM agent through a reason-act loop against a local model, with pluggable tools, a CLI entry point and a structure built to be extended."
period: "Aug 2025 – Jan 2026"
pubDate: 2026-01-05
stack: ["Python 3.11", "LangChain", "Ollama", "ReAct", "CLI"]
repo: "https://github.com/Ahmed-Abdelhafez98/AgentRunner"
featured: true
order: 3
---

AgentRunner is a Python service for running an AI agent that can **reason, decide and act**. It implements the ReAct pattern from the [2022 paper](https://arxiv.org/abs/2210.03629): the model alternates between a reasoning step, in which it thinks about what to do, and an acting step, in which it calls a tool and observes the result, until it has enough to answer. It runs against a **local model through Ollama**, so nothing leaves the machine, and it is structured so that adding a tool or swapping a model does not touch the execution loop.

## Why build this

By late 2025 I had used agent frameworks at work but had not built the loop myself, and I wanted to understand exactly where the control lives: what the model is asked at each step, how its output is parsed into a decision, what happens when that parse fails, and how tool results are fed back. Building the loop from parts made those questions concrete.

## Structure

```
src/langchain_agent/
  config.py          environment and model settings
  agent/
    planner.py       the reasoning and execution loop
    prompts.py       the ReAct prompt templates
    parsers.py       turning model output into an action or a final answer
    chains.py        LangChain wiring
    tools/           tool definitions the agent may call
  cli.py             command-line entry point
tests/
```

The pieces that matter:

- **The planner** owns the loop. It asks the model for the next step, parses the response, and either executes a tool and appends the observation or returns the final answer. A step limit prevents runaway loops.
- **Parsers** are the fragile boundary. Model output is text; the agent needs a structured action. The parser is strict about the expected format and fails loudly on anything else, because a lenient parser hides the exact bugs you need to see when developing an agent.
- **Tools** are plain functions with a name, a description and a schema. The description is what the model reads to decide when to use the tool, so writing it well is a design task, not documentation.
- **Config** reads `OLLAMA_BASE_URL` and `OLLAMA_MODEL` from the environment, so switching from an 8B model to a larger one is a one-line change.

## Running it

Create a virtual environment, `pip install -e ".[dev]"`, point the `.env` at a running Ollama, and `make run`. The CLI is deliberately minimal: it exists to exercise the loop and print each reasoning and action step so you can watch the agent think.

## What I learned

- **Local models are stricter teachers.** A smaller model follows the ReAct format less reliably than a frontier model, which forced better prompts and a more defensive parser. Those improvements carry over to any model.
- **Tool descriptions are prompts.** Most of the agent's bad decisions traced back to a vague tool description, not to the loop.
- **Keep the loop dumb.** The value is in tools and prompts. The loop should be small enough to read in one sitting.

This project directly informed the LLM extraction stage I later designed for the import pipeline at Uptal, where the same lesson applied: constrain the shape of what the model returns, and validate at the boundary.
