import { faker } from '@faker-js/faker';
import { UserSession } from './user-session';
import { TokenService } from 'src/core/application/services/token.service';

const userId = faker.string.uuid();
const refreshToken = 'refresh-token';

describe('UserSession Entity', () => {
  it('creates a valid user session object', () => {
    const session = UserSession.create(userId, refreshToken);

    expect(session.userId).toBe(userId);
    expect(session.refreshToken).toBe(refreshToken);
  });

  describe('isValidRefreshToken', () => {
    const tokenService: TokenService = {
      decodeToken: jest.fn(() => {
        return {
          user: { id: userId, email: faker.internet.email() },
        };
      }),
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    };

    beforeEach(jest.clearAllMocks);

    describe('when a valid token is provided', () => {
      it('returns true', () => {
        const session = UserSession.create(userId, refreshToken);
        const result = session.isValidRefreshToken(refreshToken, tokenService);

        expect(tokenService.decodeToken).toHaveBeenCalledTimes(1);
        expect(result).toBe(true);
      });
    });

    describe('when an invalid token is provided', () => {
      it('returns false', () => {
        const session = UserSession.create(userId, refreshToken);
        const result = session.isValidRefreshToken(
          'invalid-token',
          tokenService,
        );

        expect(tokenService.decodeToken).toHaveBeenCalledTimes(1);
        expect(result).toBe(false);
      });
    });
  });

  describe('updateRefreshToken', () => {
    it('updates refresh token', () => {
      const session = UserSession.create(userId, refreshToken);
      session.updateRefreshToken('new-refresh-token');
      expect(session.refreshToken).toBe('new-refresh-token');
    });
  });
});
