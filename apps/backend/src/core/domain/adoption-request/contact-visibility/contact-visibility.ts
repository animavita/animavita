import { AdoptionRequestStatusType } from '../status/status';

const STATUSES_WITH_VISIBLE_CONTACT: AdoptionRequestStatusType[] = [
  'pending',
  'accepted',
];

/**
 * Phone numbers are visible to both parties once the owner has shared contact,
 * and only while the two still have a reason to talk. A denied or cancelled
 * request keeps its `contactShared` flag as a record, but stops exposing the
 * numbers so the app does not become a directory of people who parted ways.
 * See ADR-0004.
 */
export const isContactVisible = ({
  status,
  contactShared,
}: {
  status: AdoptionRequestStatusType;
  contactShared?: boolean;
}): boolean =>
  contactShared === true && STATUSES_WITH_VISIBLE_CONTACT.includes(status);
