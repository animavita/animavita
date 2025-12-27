import { UserSession } from '../../domain/user-session/user-session';

export const USER_SESSION_REPOSITORY = 'USER_SESSION_REPOSITORY';

export default interface UserSessionRepository {
  getByUserId: (userId: string) => Promise<UserSession>;
  getById: (id: string) => Promise<UserSession>;
  store: (userSession: UserSession) => Promise<UserSession['id']>;
  delete: (id: string) => Promise<void>;
}
