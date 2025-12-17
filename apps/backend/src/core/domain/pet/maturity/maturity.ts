import { EntityError } from '../../errors/entity.error';

export type PetMaturityType = 'puppy' | 'young' | 'adult' | 'senior';

export default class PetMaturity {
  private value: PetMaturityType;

  private allowedValues = ['puppy', 'young', 'adult', 'senior'];

  constructor(value: string) {
    const formattedValued = value.toLocaleLowerCase();

    if (!this.allowedValues.includes(value)) {
      throw new EntityError(
        `Invalid maturity. Allowed values are ${this.allowedValues.join(',')}`,
      );
    }

    this.value = formattedValued as PetMaturityType;
  }

  getValue() {
    return this.value;
  }
}
