import PetAge from './age';

describe('PetAge', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      expect(() => new PetAge('invalid')).toThrowError(
        'Invalid age. Allowed values are puppy,young,adult,senior',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(new PetAge('young').getValue()).toEqual('young');
    });
  });
});
