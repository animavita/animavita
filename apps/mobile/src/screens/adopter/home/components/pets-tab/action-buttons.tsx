import { HStack, IconButton } from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useLocale from '@/hooks/use-locale';

type ActionButtonsProps = {
  onPass: () => void;
  onAdopt: () => void;
  onFavorite: () => void;
  disabled?: boolean;
};

export const ActionButtons = ({ onPass, onAdopt, onFavorite, disabled }: ActionButtonsProps) => {
  const { t } = useLocale();

  return (
    <HStack justifyContent="center" alignItems="center" space={4} paddingY={4}>
      <IconButton
        icon={<Icon name="close" size={32} color="white" />}
        borderRadius="full"
        backgroundColor="red.500"
        _pressed={{ backgroundColor: 'red.600' }}
        size="lg"
        onPress={onPass}
        disabled={disabled}
        width={16}
        height={16}
        accessibilityLabel={t('ACCESSIBILITY.PASS_PET')}
      />

      <IconButton
        icon={<Icon name="favorite" size={36} color="white" />}
        borderRadius="full"
        backgroundColor="green.500"
        _pressed={{ backgroundColor: 'green.600' }}
        size="xl"
        onPress={onFavorite}
        disabled={disabled}
        width={20}
        height={20}
        accessibilityLabel={t('ACCESSIBILITY.ADD_TO_FAVORITES')}
      />

      <IconButton
        icon={<Icon name="star" size={32} color="white" />}
        borderRadius="full"
        backgroundColor="blue.500"
        _pressed={{ backgroundColor: 'blue.600' }}
        size="lg"
        onPress={onAdopt}
        disabled={disabled}
        width={16}
        height={16}
        accessibilityLabel={t('ACCESSIBILITY.REQUEST_ADOPTION')}
      />
    </HStack>
  );
};
