# The Wishlist is its own record, not an Adoption Request status

Liking a Pet creates a `PetLike` keyed on `{petId, adopterId}`, unique and freely toggled. It is not an Adoption Request in an earlier state.

Folding likes into Adoption Request as a `liked` status preceding `pending` would avoid a second collection, but it collides with two decisions already made: the unique `{petId, adopterId}` index means an Adopter who liked a pet has spent their one request row on a bookmark, and ADR-0001 makes statuses terminal, so un-liking would have to be a delete. The Owner's request list would also have to learn to filter likes out of a collection that is supposed to be requests.

A like is a private bookmark. It notifies nobody, creates no obligation, and leaves the Pet in Nearest Pets so the Adopter can still request it from the feed rather than being forced through the Wishlist.

## Consequences

- Two records can exist for the same `{petId, adopterId}` — a like and a request. They are independent; requesting a pet does not clear the like, and un-liking does not cancel a request.
