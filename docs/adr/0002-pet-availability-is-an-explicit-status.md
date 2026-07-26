# Pet availability is an explicit status, not derived from its requests

A Pet carries `status: available | adopted | removed`, and Nearest Pets filters on it. The alternative was to derive availability — treat a Pet as unavailable if any of its Adoption Requests is `accepted` — which cannot drift out of sync and needs no new field.

We chose the explicit status because "available" and "adopted" are things a Pet *is*, not facts about a different collection, and because the derived version turns every Nearest Pets query into a join against adoption requests. The Owner's own pet list wants to show the same status, so deriving it would spread that join further. It also gives `removed` somewhere to live (see ADR-0003), which the derived approach has no answer for at all.

## Consequences

- Accepting a request must set the Pet to `adopted` in the same operation as the Cascade Denial. If one lands and the other does not, the data is inconsistent in a way the derived model could not have been.
- Every query for pets an Adopter could request must filter on `available`. Missing the filter fails open — the pet is shown when it should not be.
