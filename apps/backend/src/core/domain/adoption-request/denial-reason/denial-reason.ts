import { InvalidParamError } from '../../errors';

export type DenialReasonType =
  | 'rejected_by_owner'
  | 'pet_adopted'
  | 'pet_removed';

const validReasons: DenialReasonType[] = [
  'rejected_by_owner',
  'pet_adopted',
  'pet_removed',
];

export default class DenialReason {
  private readonly reason: DenialReasonType;

  constructor(aReason: string) {
    if (!this.isValid(aReason)) {
      throw new InvalidParamError(
        `Invalid denial reason: ${aReason}. Must be one of: ${validReasons.join(
          ', ',
        )}`,
      );
    }

    this.reason = aReason as DenialReasonType;
  }

  private isValid(value: string): boolean {
    return validReasons.includes(value as DenialReasonType);
  }

  getValue(): DenialReasonType {
    return this.reason;
  }

  static rejectedByOwner(): DenialReason {
    return new DenialReason('rejected_by_owner');
  }

  static petAdopted(): DenialReason {
    return new DenialReason('pet_adopted');
  }

  static petRemoved(): DenialReason {
    return new DenialReason('pet_removed');
  }
}
