import { EntityError } from '../../errors/entity.error';

type PetSizeType = 'small' | 'medium' | 'big';

export default class PetSize {
  private value: PetSizeType;

  private allowedValues = ['small', 'medium', 'big'];

  constructor(value: string) {
    const formattedValued = value.toLocaleLowerCase();

    if (!this.allowedValues.includes(value)) {
      throw new EntityError(
        `Invalid size. Allowed values are ${this.allowedValues.join(',')}`,
      );
    }

    this.value = formattedValued as PetSizeType;
  }

  getValue() {
    return this.value;
  }
}
