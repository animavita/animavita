import { EntityError } from '../../errors/entity.error';

export type PetGenderType = 'male' | 'female';

export default class PetGender {
  private value: PetGenderType;

  private allowedValues = ['male', 'female'];

  constructor(value: string) {
    const formattedValued = value.toLocaleLowerCase();

    if (!this.allowedValues.includes(value)) {
      throw new EntityError(
        `Invalid gender. Allowed values are ${this.allowedValues.join(',')}`,
      );
    }

    this.value = formattedValued as PetGenderType;
  }

  getValue() {
    return this.value;
  }
}
