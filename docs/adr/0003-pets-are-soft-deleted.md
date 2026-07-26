# Pets are soft-deleted

Deleting a posting sets the Pet to `removed` rather than deleting the row, and moves its pending Adoption Requests to `denied` with the reason `pet_removed`.

This is a deliberate reversal of the current behaviour: the repository calls `findByIdAndRemove`, a hard delete, while Adoption Requests reference the pet by id and are not touched. The result is dangling requests — an Adopter's request list can contain an entry whose Pet no longer exists. A future reader looking at a soft delete should know it replaced a hard delete on purpose, not by accident.

Keeping the row means the Adopter's request list can still render the pet's name and give a real explanation. Hard-deleting the requests alongside the pet would also avoid dangling data, but the entry would simply vanish from the Adopter's list with no reason given.

## Consequences

- Every query for pets must filter out `removed`, including the Owner's own list. This is the same failure-open risk as ADR-0002.
- The unique index on `{petId, adopterId}` still holds, so an Adopter cannot re-request a pet that was removed and later somehow returned. That is acceptable while `removed` is terminal, and would need revisiting if un-removing a posting ever becomes a feature.
