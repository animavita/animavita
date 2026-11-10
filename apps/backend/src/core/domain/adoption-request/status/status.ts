import { InvalidParamError } from '../../errors';

export type AdoptionRequestStatusType =
  | 'pending'
  | 'accepted'
  | 'denied'
  | 'cancelled';

const validStatuses: AdoptionRequestStatusType[] = [
  'pending',
  'accepted',
  'denied',
  'cancelled',
];

export default class AdoptionRequestStatus {
  private readonly status: AdoptionRequestStatusType;

  constructor(aStatus: string) {
    if (!this.isValid(aStatus)) {
      throw new InvalidParamError(
        `Invalid status: ${aStatus}. Must be one of: ${validStatuses.join(
          ', ',
        )}`,
      );
    }

    this.status = aStatus as AdoptionRequestStatusType;
  }

  private isValid(value: string): boolean {
    return validStatuses.includes(value as AdoptionRequestStatusType);
  }

  getValue(): AdoptionRequestStatusType {
    return this.status;
  }

  isPending(): boolean {
    return this.status === 'pending';
  }

  static pending(): AdoptionRequestStatus {
    return new AdoptionRequestStatus('pending');
  }

  static accepted(): AdoptionRequestStatus {
    return new AdoptionRequestStatus('accepted');
  }

  static denied(): AdoptionRequestStatus {
    return new AdoptionRequestStatus('denied');
  }

  static cancelled(): AdoptionRequestStatus {
    return new AdoptionRequestStatus('cancelled');
  }
}
