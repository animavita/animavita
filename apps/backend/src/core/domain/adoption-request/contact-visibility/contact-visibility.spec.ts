import { isContactVisible } from './contact-visibility';

describe('isContactVisible', () => {
  it.each([
    ['pending', true, true],
    ['accepted', true, true],
    ['denied', true, false],
    ['cancelled', true, false],
    ['pending', false, false],
    ['accepted', false, false],
    ['denied', false, false],
    ['cancelled', false, false],
  ] as const)(
    'for a %s request with contactShared=%s is %s',
    (status, contactShared, expected) => {
      expect(isContactVisible({ status, contactShared })).toBe(expected);
    },
  );

  it('treats a request saved before contact sharing existed as not shared', () => {
    expect(
      isContactVisible({ status: 'pending', contactShared: undefined }),
    ).toBe(false);
  });
});
