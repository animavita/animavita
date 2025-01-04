import PetSize from './size';

describe('PetSize', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      expect(() => new PetSize('invalid')).toThrowError(
        'Invalid size. Allowed values are small,medium,big',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(new PetSize('medium').getValue()).toEqual('medium');
    });
  });
});
