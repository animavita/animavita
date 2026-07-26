# Adoption Request statuses are terminal once they leave pending

An Adoption Request starts `pending` and can move to `accepted`, `denied`, or `cancelled`. Those three are terminal: any further transition raises a `ConflictError`. We chose this because reversing an accept is not a status change but an unwind — accepting triggers Cascade Denial and marks the Pet `adopted`, so allowing `accepted → denied` would mean restoring the auto-denied siblings to `pending` and returning the Pet to circulation, and it is not obvious that an Adopter denied an hour ago should be back in the running. Keeping the transitions one-way keeps that problem out of the MVP.

`cancelled` is a distinct status rather than a reuse of `denied` so that "the Adopter walked away" stays distinguishable from "the Owner said no". `denied` additionally carries a nullable Denial Reason (`rejected_by_owner`, `pet_adopted`, `pet_removed`), which is what lets the app tell an Adopter that a pet found a home instead of implying they were personally rejected.

## Consequences

- The domain's existing `accept()` and `deny()` methods overwrite the status with no guard. They need to enforce pending-only, and a `cancel()` method has to join them.
- Letting an Owner change their mind, or an Adopter back out after being accepted, are both real product questions. They are deferred, not rejected.
