# Administration is out of scope for v2

`UserRole` includes an `Admin` value, but `assignRole` throws if you pass it, so no admin can be created. This is deliberate, not an oversight — v2 closes out the Owner/Adopter loop and nothing more. The README's "Administration: TBD" section stays empty on purpose.

Anyone finding the unreachable `Admin` value should leave it alone rather than "finishing" it. Designing an admin surface needs its own grilling session: what an admin can actually do, and how the first one comes into existence given onboarding cannot grant the role.

## Consequences

- There is no way to moderate an inappropriate pet posting in v2. The only remedy is the Owner removing it themselves, or direct database access.
