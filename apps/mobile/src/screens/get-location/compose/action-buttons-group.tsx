import { Button, Spinner, View } from 'native-base';

import useLocale from '../../../hooks/use-locale';

type ButtonGroupProps = {
  isLoading: boolean;
  hasLocation: boolean;
  onPress: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

export const ActionButtonsGroup = ({
  isLoading,
  hasLocation,
  onPress,
  onConfirm,
  children,
}: ButtonGroupProps) => {
  const { t } = useLocale();

  if (!isLoading && !hasLocation)
    return (
      <Button variant="solid" onPress={onPress}>
        {t('SHARE_LOCATION.GET_LOCATION')}
      </Button>
    );

  if (isLoading && !hasLocation) return <Spinner />;

  return (
    <View alignItems="center">
      {children}
      <Button variant="solid" onPress={onConfirm}>
        {t('SHARE_LOCATION.CONFIRM_BUTTON')}
      </Button>
      <Button variant="ghost" onPress={onPress}>
        {isLoading ? <Spinner /> : t('SHARE_LOCATION.GET_LOCATION_NEW_ATTEMPT')}
      </Button>
    </View>
  );
};
