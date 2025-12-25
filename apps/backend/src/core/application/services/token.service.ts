export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface AccessTokenPayload {
  user: { id: string; email: string; sessionId: string };
}

export interface RefreshTokenPayload {
  user: { id: string; email: string };
}

export interface TokenService {
  generateAccessToken: (payload: AccessTokenPayload) => Promise<string>;
  generateRefreshToken: (payload: RefreshTokenPayload) => Promise<string>;
  decodeToken: (token: string) => AccessTokenPayload;
}
