# An adopted Pet cannot be removed

An Owner may remove a Pet that is `available`, but attempting to remove one that is `adopted` is a conflict. The alternative was to allow it, which is what an Owner tidying their list would expect.

Pet Status is a single field holding `available | adopted | removed` (ADR-0002). That field cannot say both "this Pet was adopted" and "this posting was withdrawn", so allowing removal after acceptance would overwrite the record that the adoption ever happened — and the accepted Adopter's request would then point at a Pet whose status claims it was withdrawn instead.

We considered splitting `removed` out of the status into an independent marker, which would let a Pet be both adopted and withdrawn and is the more honest model. We did not, because availability and withdrawal being one question is what keeps every read path to a single filter, and because removal is meant for a posting that has not concluded. Once an Owner has accepted someone there is nothing left to withdraw.

## Consequences

- Removal must be rejected in the usecase, not merely hidden in the app. A stale screen must not be able to erase a concluded adoption.
- An Owner's list accumulates their adopted Pets with no way to clear them. If that becomes a real complaint, the answer is hiding or archiving — a different feature from withdrawing a posting, and one that does not touch Pet Status.
- If un-removing a posting is ever added (ADR-0003 rules it out today), this guard is the first thing to revisit: it exists to protect a single status field, and a reversible removal probably needs that field split after all.
