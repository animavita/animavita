import PetGender from './gender';

describe('Gender', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      expect(() => new PetGender('invalid')).toThrowError(
        'Invalid gender. Allowed values are male,female',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(new PetGender('female').getValue()).toEqual('female');
    });
  });
});
