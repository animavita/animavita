import { useNavigation } from '@react-navigation/native';
import { Heading, Image, Text, View } from 'native-base';

import { ActionButtonsGroup } from './compose';
import localizationImg from '../../../assets/localization.png';
import SafeArea from '../../components/safe-area/safe-area';
import AppStatusBar from '../../components/status-bar/status-bar.component';
import { useAuth } from '../../hooks/use-auth-provider';
import { useGeolocation } from '../../hooks/use-geolocation';
import useLocale from '../../hooks/use-locale';
import Routes from '../../routes';
import theme from '../../theme';

const GetLocation = () => {
  const auth = useAuth();
  const { getLocation, address, isLoading } = useGeolocation();
  const { t } = useLocale();
  const { navigate } = useNavigation();

  const onConfirmLocation = () => navigate(Routes.Profile as never);

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
          hasLocation={!!address?.length}
        >
          <Text color={theme.colors.gray[400]}>{t('SHARE_LOCATION.WHERE_USER_ARE_MSG')}</Text>
          <Text my={2} fontSize={20} fontWeight="extrabold">
            {address?.length && `${address[0].region} - ${address[0].subregion}`}
          </Text>
        </ActionButtonsGroup>
      </SafeArea>
    </View>
  );
};

export default GetLocation;
