import { NavigationProp, useNavigation as useNavigationNative } from '@react-navigation/native';

import { StackParamsList } from './main-navigator';

export const useNavigation = useNavigationNative<NavigationProp<StackParamsList>>;
