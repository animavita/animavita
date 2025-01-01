import { EntityError } from '../errors/entity.error';

export default class Size {
  private value: 'small' | 'medium' | 'big';

  constructor(value: string) {
    const formattedValued = value.toLocaleLowerCase();

    if (
      formattedValued !== 'small' &&
      formattedValued !== 'medium' &&
      formattedValued !== 'big'
    ) {
      throw new EntityError(
        'Invalid size. Allowed values are small, medium, or big',
      );
    }

    this.value = formattedValued;
  }

  getValue() {
    return this.value;
  }
}
