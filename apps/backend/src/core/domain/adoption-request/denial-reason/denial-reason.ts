import { InvalidParamError } from '../../errors';

/**
 * Why a request ended up denied. Only set on denied requests, so an Adopter can
 * be told a pet found a home rather than that they were personally rejected.
 * See ADR-0001.
 */
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
}
