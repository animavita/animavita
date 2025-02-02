import { TokenService } from '../../application/services/token.service';

export class UserSession {
  private constructor(readonly userId: string, private _refreshToken: string) {}

  get refreshToken() {
    return this._refreshToken;
  }

  set refreshToken(token: string) {
    this._refreshToken = token;
  }

  isValidRefreshToken(token: string, tokenService: TokenService): boolean {
    return (
      tokenService.decodeToken(token).user.id === this.userId &&
      token === this.refreshToken
    );
  }

  updateRefreshToken(newToken: string) {
    this.refreshToken = newToken;
  }

  static create(userId: string, refreshToken: string) {
    return new UserSession(userId, refreshToken);
  }
}
