import { UserType } from '../../../../../shared/types';

export type UserInfo = UserType;

type SignUpParams = Pick<UserType, 'name' | 'email' | 'password'>;
type GetLocationParams = Pick<UserType, 'location'>;

export type UpdateUserInfo = (params: SignUpParams) => void;
export type UpdateUserLocation = (params: GetLocationParams) => void;

export type OnBoardingContextType = {
  userInfo: UserType;
  updateUserInfo: UpdateUserInfo;
  updateUserLocation: UpdateUserLocation;
  signUp: () => void;
};
