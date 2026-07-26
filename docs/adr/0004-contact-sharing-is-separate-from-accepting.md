# Contact Sharing is a separate action from accepting a request

Phone numbers are revealed by an explicit Owner action on a pending Adoption Request, recorded as a `contactShared` flag. It does not change the Request Status and does not commit the Owner to the adoption.

The obvious alternative is to reveal numbers when a request is `accepted`, which needs no new concept at all. We rejected it because it forces the Owner to choose someone before speaking to anybody, and only ever lets one Adopter make contact. The product premise is the opposite — the README describes Animavita as letting "both sides have a conversation, and the user to research and decide". An Owner should be able to phone three people and then decide.

Revealing numbers on any pending request, with no gate, was rejected on privacy grounds: anyone could harvest Owner phone numbers by requesting pets.

## Consequences

- Sharing is currently one-sided — the Owner decides, and the Adopter's number is exposed without their explicit say-so beyond having made the request. A two-sided consent flow is the better end state and is deferred.
- Because it is a flag rather than a status, an Owner can share contact and still deny the request. That is intended.
- This is what the roadmap line "Owner can meet adopters by calling them" means. The word "meet" does not appear in the model.
