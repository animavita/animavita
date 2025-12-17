import PetMaturity from './maturity';

describe('PetMaturity', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      expect(() => new PetMaturity('invalid')).toThrowError(
        'Invalid maturity. Allowed values are puppy,young,adult,senior',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(new PetMaturity('young').getValue()).toEqual('young');
    });
  });
});
