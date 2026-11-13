import PetStatus from './status';

describe('Status', () => {
  describe('when input is invalid', () => {
    it.each(['invalid', 'removed', 'Available', ''])(
      'throws an error for "%s"',
      (value) => {
        expect(() => new PetStatus(value)).toThrowError(
          'Invalid status. Allowed values are available,adopted',
        );
      },
    );
  });

  describe('when input is valid', () => {
    it.each(['available', 'adopted'])('accepts "%s"', (value) => {
      expect(new PetStatus(value).getValue()).toEqual(value);
    });
  });
});
