import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Heading, Image, Text, View } from 'native-base';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

import { ActionButtonsGroup } from './compose';

import localizationImg from '@/assets/localization.png';
import SafeArea from '@/components/safe-area/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';
import { useAuth } from '@/hooks/use-auth-provider';
import useLocale from '@/hooks/use-locale';
import useGeolocation, { Warnings } from '@/hooks/use-user-location/use-user-location';
import Routes from '@/routes';
import theme from '@/theme';

const errorAlert = (msg: string, onPress: () => void, text?: string) =>
  Alert.alert('Error', msg, [
    {
      text,
      onPress,
      style: 'cancel',
    },
  ]);

const GetLocation = () => {
  const auth = useAuth();
  const { getLocation, address, isLoading, warning } = useGeolocation();
  const { t } = useLocale();
  const { navigate } = useNavigation();

  const onConfirmLocation = () => navigate(Routes.Home as never);

  useEffect(() => {
    if (warning === Warnings.GPS_DISABLED) {
      errorAlert(t('SHARE_LOCATION.GPS_DISABLED_WARNING'), () => {
        Location.enableNetworkProviderAsync();
      });
    }

    if (warning === Warnings.LOCATION_REQUIRED) {
      errorAlert(
        'SHARE_LOCATION.LOCATION_REQUIRED_WARNING',
        () => {
          Linking.openSettings();
        },
        t('SHARE_LOCATION.GO_TO_SETTINGS')
      );
    }
  }, [warning]);

  return (
    <View flex="1" padding={8}>
      <AppStatusBar />
      <SafeArea>
        <View width={260}>
          <Heading fontSize={35}>
            {t('SHARE_LOCATION.GREETINGS', { name: auth.user?.name })}
            <Heading fontSize={35} color={theme.colors.primary[600]}>
              {' '}
              {`${t('SHARE_LOCATION.LOCATION')}`}
            </Heading>
          </Heading>
        </View>
        <Image
          source={localizationImg}
          resizeMode="contain"
          flex="1"
          alt={t('SHARE_LOCATION.IMAGE_ALT_TEXT')}
        />
        <ActionButtonsGroup
          isLoading={isLoading}
          onPress={getLocation}
          onConfirm={onConfirmLocation}
          hasLocation={!!address}
        >
          <Text color={theme.colors.gray[400]}>{t('SHARE_LOCATION.WHERE')}</Text>
          <Text my={2} fontSize={20} fontWeight="extrabold">
            {!!address && `${address.city} - ${address.state}`}
          </Text>
        </ActionButtonsGroup>
      </SafeArea>
    </View>
  );
};

export default GetLocation;
