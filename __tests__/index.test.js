const sum = (x, y) => x + y;

describe('Setup application', () => {
  it('must be a sum that  equals to 2', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
