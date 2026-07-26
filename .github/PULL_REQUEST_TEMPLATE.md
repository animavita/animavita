<!--
Keep PRs small and focused on one change. If this PR does two things, it's probably two PRs.
-->

## What changed

<!-- One or two sentences. What does this do, from the user's point of view where that applies? -->

Closes #

## Why

<!-- Only if it isn't obvious from the linked issue. Decisions you made and alternatives you rejected go here. -->

## How to test it

<!--
Steps a reviewer can follow. The seeded accounts (owner@email.com / adopter@email.com, both Password123)
are usually the fastest way in — see CONTRIBUTING.md.
-->

1.

## Checklist

- [ ] `pnpm verify` passes locally (typecheck, lint, tests)
- [ ] Tests cover the new behaviour
- [ ] New user-facing copy goes through `t()` and is added to `src/i18n/locales/pt-BR.json`
- [ ] No Mongoose / Express / AWS SDK imports were added under `apps/backend/src/core/`
- [ ] Shared DTOs and validation schemas updated if the API contract changed

## Screenshots / recording

<!-- Required for anything that changes the UI. Before and after, if you're changing something that already existed. -->
