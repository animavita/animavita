# Animavita — agent guide

Pet adoption app. `v2` is a full rebuild with a cleaner UI and codebase — **always branch from `v2`, never `master` or `next`** (those are stale).

The feature roadmap and the business rules live in `README.md`. Read the business rules before touching adoption logic; several of them are cross-entity and easy to miss.

## Layout

```
apps/backend                NestJS + MongoDB (Mongoose) API
apps/mobile                 Expo / React Native app (iOS, Android, web)
shared/types                @animavita/types — DTOs shared across API and app
shared/validation-schemas   @animavita/validation-schemas — Joi schemas shared across API and app
infrastructure/terraform    Terraform (not part of app development)
```

pnpm workspaces. Run app commands through the root filters: `pnpm backend <script>`, `pnpm mobile <script>`.

## Verifying your work

```sh
pnpm verify                 # check-types + lint + test — run this before opening a PR
pnpm check-types            # tsc across backend and mobile
pnpm lint                   # eslint, read-only
pnpm lint:fix               # eslint with --fix, modifies files
pnpm test                   # jest in backend and mobile
```

Per app: `pnpm backend test`, `pnpm mobile check-types`, etc.

Use the Node version in `.nvmrc` (v20.13.1) and pnpm 9 or 10. On a newer Node, `argon2` fails to compile its native binding and the sign-in specs won't run.

CI runs backend and mobile tests separately (`.github/workflows/run-*-tests.yml`). Note that CI currently runs only backend **e2e** tests and does **not** typecheck either app — so a green CI does not mean `pnpm verify` passes. Run it locally.

## Running it

```sh
docker-compose up -d                       # mongodb + backend
docker-compose exec backend pnpm seed      # seed data (safe to re-run)
pnpm mobile start                          # Expo
```

Seeded accounts: `owner@email.com` and `adopter@email.com`, both `Password123`, plus 5 pets owned by the owner. Use these instead of registering new users.

`apps/mobile/.env` defaults to `ENV=staging`, which points at the hosted staging backend. Set `ENV=dev` to use your local one.

Two things that will waste your time if you don't know them:

- After changing dependencies you must rebuild the container and drop the volume: `docker-compose up --build --force-recreate -V`. `node_modules` lives in an anonymous volume, so a plain restart keeps the stale deps.
- Phone verification accepts **any** OTP code in development.

## Backend architecture

Clean architecture. The dependency direction is inward only, and this is the rule most likely to be broken:

```
infra/  ──▶  core/application/  ──▶  core/domain/
modules/     (usecases, ports)       (entities, value objects)
```

| Directory | Holds | May import |
| --- | --- | --- |
| `core/domain/` | Entities (`Pet`, `User`, `AdoptionRequest`), value objects (`Email`, `Location`, `Role`), domain errors | nothing outside `core/domain/` |
| `core/application/` | Usecases, plus the **interfaces** for repositories, DAOs and services | `core/domain/` |
| `infra/` | Controllers, Mongo repositories/DAOs/schemas, S3 provider, interceptors | anything |
| `modules/` | NestJS module wiring — this is where interfaces get bound to implementations | anything |

**`core/` must never contain Mongoose, Express, AWS SDK or `@nestjs/mongoose` imports.** `@nestjs/common` (`@Injectable`, `@Inject`) is the one accepted exception, since DI is how the ports get filled.

### Ports and DI tokens

Every port is an interface plus a string token exported from the same file:

```ts
// core/application/repositories/pet.repository.ts
export const PET_REPOSITORY = 'PET_REPOSITORY';
export default interface PetRepository {
  getById(id: string): Promise<Pet>;
  store(pet: Pet): Promise<{ id: string }>;
  remove(id: string): void;
}
```

Usecases inject by token (`@Inject(PET_REPOSITORY)`), never by concrete class. The binding lives in the matching file under `modules/`.

`repositories/` return domain entities. `dao/` exist for read paths that need shaped query results instead of entities — use a DAO when you'd otherwise hydrate an entity just to throw most of it away.

### Errors

Usecases throw **domain** errors (`NotFoundError`, `UnauthorizedError`, `ConflictError`, `EntityError`, `DatabaseError`) and never HTTP exceptions. `infra/interceptors/error-mapper.interceptor.ts` translates them:

| Domain error | HTTP |
| --- | --- |
| `EntityError`, `DatabaseError` | 422 |
| `UnauthorizedError` | 401 |
| `NotFoundError` | 404 |
| `ConflictError` | 409 |

If you need a new status code, add the error to `core/domain/errors/` and a branch to the interceptor.

### Adding a backend feature

1. Extend or add the entity in `core/domain/<entity>/` with its `.spec.ts`.
2. Add the usecase in `core/application/usecases/<owner|adopter>/<use-case-name>/`, with its `.spec.ts`.
3. Add any new port method to the interface in `core/application/repositories/` or `dao/`.
4. Implement that method in `infra/repositories/` or `infra/dao/`.
5. Add the route to the relevant controller in `infra/controllers/`, guarded by `@UseGuards(AccessTokenGuard)` and reading the caller via the `@User()` decorator.
6. Wire the usecase into the matching module under `modules/`.
7. Add or update the shared DTO in `shared/types/dtos/` so the mobile app gets the type.

Authorization belongs in the usecase (`user.role.isAdopter`, `pet.ownerId === userId`), not the controller.

### Backend gotchas

- `strictNullChecks` and `noImplicitAny` are **off** (`apps/backend/tsconfig.json`). `tsc` will not catch null bugs for you — write the test.
- Entities use `private` setters with public getters and a `private constructor` + static `create()`. Follow that shape; don't add public mutable fields.
- Tests are `*.spec.ts`, colocated. `mongodb-memory-server` for anything touching Mongo, `fishery` factories for fixtures.

## Mobile

```
src/screens/          one directory per screen, grouped by role (adopter/, owner/) where relevant
src/services/         HTTP calls + react-query keys; one file per resource
src/components/       shared UI
src/hooks/            shared hooks
src/state/            client state
src/config/           env + feature flags
src/i18n/             i18next; locales/pt-BR.json
src/test/             test-utils.tsx, msw handlers, fixtures
```

- **All user-facing copy goes through `t()` and into `src/i18n/locales/pt-BR.json`.** Never hardcode a string in a component. `pt-BR` is currently the only locale.
- Data fetching is `@tanstack/react-query` over `services/http-client.ts`. Query keys are centralized in `services/query-keys.ts` — add yours there rather than inlining.
- Forms are `react-hook-form` + `joiResolver` from `@hookform/resolvers/joi`, fed by the shared Joi schemas. Add new schemas to `shared/validation-schemas` (they compose with `.fork()`) so the backend can reuse them.
- UI is still `native-base` (patched — see `patches/`). Migration to gluestack is tracked in issue #208; don't start new work on native-base internals without checking that issue.
- Feature flags come from PostHog. With `EXPO_PUBLIC_POSTHOG_API_KEY=dev` PostHog never initializes and flags fall back to `src/config/local-feature-flags.ts`, defaulting to `false`. Override there for local testing.
- Tests are `*.test.ts(x)`, colocated. Render through `src/test/test-utils.tsx` (it provides the query client, i18n and navigation), and mock the network with the `msw` handlers in `src/test/msw` rather than mocking the service module.

## Agent skills

This repo vendors [mattpocock/skills](https://github.com/mattpocock/skills) (MIT) under `.claude/skills/`. The main flow is `/grill-with-docs` → `/to-spec` → `/to-tickets` → `/implement`, with `/tdd` and `/code-review` doing the work inside it.

### Issue tracker

Issues live in GitHub Issues at `animavita/animavita`, driven through the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles map 1:1 to label strings of the same name. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` at the repo root holds the glossary, `docs/adr/` holds the decisions. **Read both before working on adoption logic** — several decisions there deliberately reverse what the current code does. See `docs/agents/domain.md`.

Use the glossary's vocabulary in code, tickets and tests. Note the `@animavita/types` package predates it and contradicts it (`AdoptionType` means Pet, `CreateAdoptionRequest` means a pet posting, not a request) — CONTEXT.md has the mapping under "Known vocabulary debt".

## Pull requests

Small and focused on one change. Typecheck, lint and tests must pass. Follow `.github/PULL_REQUEST_TEMPLATE.md`. Full contributor setup is in `CONTRIBUTING.md`.
