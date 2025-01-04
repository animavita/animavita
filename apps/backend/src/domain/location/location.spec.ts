import PetLocation from './location';

describe('PetSize', () => {
  describe('when input is invalid', () => {
    it('throws an error', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new PetLocation(1, '2')).toThrowError(
        'Invalid latitude in location',
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(() => new PetLocation('1', 2)).toThrowError(
        'Invalid longitude in location',
      );
    });
  });

  describe('when input is valid', () => {
    it('sets the value', () => {
      expect(new PetLocation(1, 2).getValue()).toEqual({
        latitude: 2,
        longitude: 1,
      });
    });
  });
});
