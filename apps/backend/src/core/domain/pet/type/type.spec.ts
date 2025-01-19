import PetType from './type';

describe('PetType', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      expect(() => new PetType('invalid')).toThrowError(
        'Invalid type. Allowed values are dog,cat,other',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(new PetType('dog').getValue()).toEqual('dog');
    });
  });
});
