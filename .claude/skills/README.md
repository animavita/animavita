# Agent skills

These are vendored from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT — see `LICENSE-mattpocock-skills`), copied from the `engineering/` and `productivity/` categories at v1.2.0. They're committed so every contributor gets the same workflow without installing anything.

Per-repo configuration lives in `docs/agents/`, and is summarised in the `## Agent skills` section of the root `CLAUDE.md`.

## The main flow

```
/grill-with-docs   align on what we're building, build up domain vocabulary
      ↓
/to-spec           turn the conversation into a spec, published as a GitHub issue
      ↓
/to-tickets        break the spec into tracer-bullet tickets with blocking edges
      ↓
/implement         build a ticket, driving /tdd, ending in /code-review
```

The point of the spec/ticket split is context budget: each ticket should fit comfortably in one fresh session rather than cramming a whole feature into one bloated one.

## What a ticket looks like here

A ticket is a **vertical slice** — a thin but complete path through every layer it touches (domain → usecase → API → app → tests), demoable on its own when finished. Not "add the endpoint" then "add the screen".

The one exception is a wide refactor, where a single mechanical change breaks thousands of call sites. Those go **expand → migrate in batches → contract**, so CI stays green between tickets.

`.github/ISSUE_TEMPLATE/feature.yml` mirrors this shape for issues opened by hand.

## Updating

These are a snapshot, not a submodule. To refresh, re-copy `skills/engineering/*` and `skills/productivity/*` from upstream and re-read the diff — don't blind-overwrite, since `docs/agents/` is generated against a specific version.
