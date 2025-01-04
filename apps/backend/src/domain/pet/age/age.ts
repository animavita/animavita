import { EntityError } from '../../errors/entity.error';

type PetAgeType = 'puppy' | 'young' | 'adult' | 'senior';

export default class PetAge {
  private value: PetAgeType;

  private allowedValues = ['puppy', 'young', 'adult', 'senior'];

  constructor(value: string) {
    const formattedValued = value.toLocaleLowerCase();

    if (!this.allowedValues.includes(value)) {
      throw new EntityError(
        `Invalid age. Allowed values are ${this.allowedValues.join(',')}`,
      );
    }

    this.value = formattedValued as PetAgeType;
  }

  getValue() {
    return this.value;
  }
}
