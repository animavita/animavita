export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface TokenPayload {
  user: { id: string; email: string };
}

export interface TokenService {
  generateAccessToken: (payload: TokenPayload) => Promise<string>;
  generateRefreshToken: (payload: TokenPayload) => Promise<string>;
  decodeToken: (token: string) => TokenPayload;
}
