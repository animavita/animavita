# Animavita

Animavita connects people who need to rehome a pet with people looking to adopt one nearby. It is a directory and an introduction service — the app does not carry out the adoption. Once the two people are in contact they arrange everything between themselves, and nothing in the system records whether the animal actually changed hands.

## Language

### People

**Owner**
A user who posts pets for adoption. A user is either an Owner or an Adopter, chosen at onboarding, never both.
_Avoid_: donor, giver, poster, seller

**Adopter**
A user who browses nearby pets and requests to adopt them.
_Avoid_: requester, applicant, adoptee, client

**Admin**
A role that exists in `UserRole` but cannot currently be granted — `assignRole` refuses it deliberately. Out of scope for v2. See ADR-0006.

### Pets

**Pet**
An animal an Owner has posted for adoption, carrying its name, breed, species, maturity, gender, size, observations, photos, and the Owner's location.
_Avoid_: adoption, listing, animal. The shared types call this `AdoptionType` and `CreateAdoptionRequest`; both are legacy misnomers — see **Known vocabulary debt** below.

**Species**
Whether the pet is a dog, a cat, or other.
_Avoid_: type, animal type

**Pet Status**
A Pet is `available`, `adopted`, or `removed`. Only `available` pets appear in Nearest Pets. `adopted` is set by the cascade when a request is accepted; `removed` is set when the Owner deletes the posting, which is a soft delete so existing Adoption Requests still resolve. See ADR-0002 and ADR-0003.
_Avoid_: deleted, archived, inactive

**Nearest Pets**
The Adopter's feed: available pets within a radius of the Adopter's location, excluding every pet that Adopter has already requested regardless of that request's status. A pet the Adopter has merely liked still appears here.
_Avoid_: feed, nearby, discovery, search results

### Adoption

**Adoption Request**
An Adopter's request to adopt one specific Pet. Unique per `{petId, adopterId}` — an Adopter gets one request per pet, ever, which is what stops them re-requesting after giving up.
_Avoid_: application, adoption, offer, claim

**Request Status**
`pending`, `accepted`, `denied`, or `cancelled`. Only `pending` requests can change; the other three are terminal. See ADR-0001.

**Cascade Denial**
When an Owner accepts a request, every other pending request for that Pet is automatically denied with the reason `pet_adopted`, and the Pet becomes `adopted`.
_Avoid_: auto-reject, bulk deny

**Denial Reason**
Why a request ended up `denied`: `rejected_by_owner` (the Owner turned this Adopter down), `pet_adopted` (Cascade Denial — someone else was chosen), or `pet_removed` (the Owner withdrew the posting). Only set on `denied` requests. It exists so the Adopter can be told "this pet found a home" rather than the bruising and inaccurate "denied".
_Avoid_: rejection reason, status reason

**Cancelled**
An Adopter withdrawing their own request. Distinct from `denied`, which is always the Owner's or the system's doing.
_Avoid_: withdrawn, abandoned, given up

**Contact Sharing**
The Owner revealing phone numbers on a pending request so the two can talk. It does not change the Request Status and does not commit the Owner to anything — the point is to allow a conversation *before* deciding. This is what the roadmap means by an Owner "meeting" an Adopter. See ADR-0004.
_Avoid_: meeting, match, connection, introduction

**Pet Like**
An Adopter privately bookmarking a Pet, unique per `{petId, adopterId}` and freely toggled. It creates no Adoption Request and does not notify the Owner. The collection of an Adopter's likes is their **Wishlist**. See ADR-0005.
_Avoid_: favourite, save, star, bookmark

## Known vocabulary debt

The shared types in `@animavita/types` predate this glossary and contradict it. Do not copy these names into new code, and prefer the glossary term when writing tickets:

| Type | Actually means | Glossary term |
| --- | --- | --- |
| `AdoptionType`, `AdoptionResponse` | a pet posting | Pet |
| `CreateAdoptionRequest`, `UpdateAdoptionRequest` | create/update a pet posting | Pet |
| `AdoptionRequestResponse` | an Adopter's request to adopt | Adoption Request |
| `AnimalType` | dog / cat / other | Species |

`CreateAdoptionRequest` and `AdoptionRequestResponse` are unrelated concepts with nearly the same name — the first is a Pet, the second is an Adoption Request. Renaming them is a wide refactor and is tracked separately.
