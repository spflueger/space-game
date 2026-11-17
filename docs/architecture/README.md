# Architecture Documentation (arc42-lite)

This directory follows a modular, lightweight [arc42](https://arc42.org/) architecture structure tailored for high-efficiency reading by human contributors and AI coding agents.

## Structure & Table of Contents

- [**01. Context & Scope**](./01-context-scope.md): System boundaries, external actors, inputs and outputs.
- [**03. Solution Strategy**](./03-solution-strategy.md): Foundational technical decisions and guiding paradigms.
- [**05. Building Block View**](./05-building-blocks.md): Static structure, modules, components, and core interfaces.
- [**06. Runtime View**](./06-runtime-view.md): Dynamic execution flow, turn resolution pipeline, and state transitions.
- [**08. Cross-Cutting Concepts**](./08-cross-cutting.md): Determinism, seedable PRNG, state serialization, and error handling.

## Reading Rule for Agents
Do not load all files into context at once. Load only the specific section relevant to the current task or ticket.
