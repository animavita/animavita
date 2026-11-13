import { EntityError } from '../../errors/entity.error';

export type PetStatusType = 'available' | 'adopted';

export default class PetStatus {
  private value: PetStatusType;

  private allowedValues = ['available', 'adopted'];

  constructor(value: string) {
    if (!this.allowedValues.includes(value)) {
      throw new EntityError(
        `Invalid status. Allowed values are ${this.allowedValues.join(',')}`,
      );
    }

    this.value = value as PetStatusType;
  }

  getValue() {
    return this.value;
  }
}
