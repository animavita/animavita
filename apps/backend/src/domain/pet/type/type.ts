import { EntityError } from '../../errors/entity.error';

export type PetTypeType = 'dog' | 'cat' | 'other';

export default class PetType {
  private value: PetTypeType;

  private allowedValues = ['dog', 'cat', 'other'];

  constructor(value: string) {
    const formattedValued = value.toLocaleLowerCase();

    if (!this.allowedValues.includes(value)) {
      throw new EntityError(
        `Invalid type. Allowed values are ${this.allowedValues.join(',')}`,
      );
    }

    this.value = formattedValued as PetTypeType;
  }

  getValue() {
    return this.value;
  }
}
