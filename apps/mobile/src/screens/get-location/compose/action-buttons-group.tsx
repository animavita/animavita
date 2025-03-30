import { Button, Spinner, View } from 'native-base';

import useLocale from '@/hooks/use-locale';

type ButtonGroupProps = {
  isLoading: boolean;
  hasLocation: boolean;
  onPress: () => void;
  onConfirm: () => void;
  onSkip: () => void;
  children: React.ReactNode;
};

export const ActionButtonsGroup = ({
  isLoading,
  hasLocation,
  onPress,
  onConfirm,
  onSkip,
  children,
}: ButtonGroupProps) => {
  const { t } = useLocale();

  if (!isLoading && !hasLocation)
    return (
      <>
        <Button variant="solid" onPress={onPress}>
          {t('SHARE_LOCATION.GET_LOCATION')}
        </Button>

        <Button variant="link" onPress={onSkip}>
          {t('SHARE_LOCATION.SKIP')}
        </Button>
      </>
    );

  if (isLoading && !hasLocation) return <Spinner />;

  return (
    <View alignItems="center">
      {children}
      <Button disabled={isLoading} variant="solid" onPress={onConfirm}>
        {t('SHARE_LOCATION.CONFIRM_BUTTON')}
      </Button>
      <Button variant="ghost" onPress={onPress}>
        {isLoading ? <Spinner /> : t('SHARE_LOCATION.GET_LOCATION_NEW_ATTEMPT')}
      </Button>
    </View>
  );
};
