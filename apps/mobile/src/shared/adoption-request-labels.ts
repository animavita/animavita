import { AdoptionRequestResponse, AdoptionRequestStatus, DenialReason } from '@animavita/types';

type RequestOutcome = Pick<AdoptionRequestResponse, 'status' | 'denialReason'>;

/**
 * An Adopter must be able to tell "the pet found a home" from "the Owner turned
 * me down". Those are different messages, not one status, so a denied request
 * reads off its Denial Reason rather than off the status alone. See ADR-0001.
 *
 * Requests denied before the reason existed have none, and fall back to the
 * plain denied copy.
 */
export const adopterStatusLabelKey = ({ status, denialReason }: RequestOutcome) => {
  if (status === AdoptionRequestStatus.DENIED && denialReason) {
    return `ADOPTION_REQUESTS.ADOPTER.CARD.STATUS_DENIED_${denialReason.toUpperCase()}`;
  }

  return `ADOPTION_REQUESTS.ADOPTER.CARD.STATUS_${status.toUpperCase()}`;
};

/**
 * The Owner does not need the reason spelled out — they are the one who acted,
 * and the cascade only ever closes requests for their own pet.
 */
export const ownerStatusLabelKey = ({ status }: RequestOutcome) =>
  `ADOPTION_REQUESTS.OWNER.CARD.STATUS_${status.toUpperCase()}`;

export const adopterOutcomeNoticeKey = ({ status, denialReason }: RequestOutcome) => {
  if (status === AdoptionRequestStatus.ACCEPTED) {
    return 'ADOPTION_REQUESTS.ADOPTER.DETAIL.ALREADY_ACCEPTED';
  }

  if (status === AdoptionRequestStatus.CANCELLED) {
    return 'ADOPTION_REQUESTS.ADOPTER.DETAIL.ALREADY_CANCELLED';
  }

  if (denialReason) {
    return `ADOPTION_REQUESTS.ADOPTER.DETAIL.ALREADY_DENIED_${denialReason.toUpperCase()}`;
  }

  return 'ADOPTION_REQUESTS.ADOPTER.DETAIL.ALREADY_DENIED';
};

export const ownerOutcomeNoticeKey = ({ status }: RequestOutcome) => {
  if (status === AdoptionRequestStatus.ACCEPTED) {
    return 'ADOPTION_REQUESTS.OWNER.DETAIL.ALREADY_ACCEPTED';
  }

  if (status === AdoptionRequestStatus.CANCELLED) {
    return 'ADOPTION_REQUESTS.OWNER.DETAIL.ALREADY_CANCELLED';
  }

  return 'ADOPTION_REQUESTS.OWNER.DETAIL.ALREADY_DENIED';
};

/**
 * A pet going to someone else is not a rejection, so it does not get the
 * rejection colour.
 */
export const requestStatusColor = ({ status, denialReason }: RequestOutcome) => {
  switch (status) {
    case AdoptionRequestStatus.ACCEPTED:
      return 'success';
    case AdoptionRequestStatus.DENIED:
      return denialReason === DenialReason.PET_ADOPTED ? 'info' : 'danger';
    case AdoptionRequestStatus.CANCELLED:
      return 'coolGray';
    default:
      return 'warning';
  }
};
