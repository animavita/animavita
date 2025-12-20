import { Actionsheet, Box, Button, HStack, Text } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  children: React.ReactNode;
};

export const FiltersModal = ({ isOpen, onClose, onApply, children }: FiltersModalProps) => {
  const { t } = useLocale();

  const handleApply = () => {
    onApply();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={handleCancel}>
      <Actionsheet.Content>
        <Box width="100%" px={4}>
          <Text fontSize="lg" fontWeight="bold" mb={6}>
            {t('HOME.FILTERS_MODAL.TITLE')}
          </Text>

          {children}

          <HStack space={3} justifyContent="flex-end">
            <Button variant="ghost" onPress={handleCancel}>
              {t('HOME.FILTERS_MODAL.CANCEL_BUTTON')}
            </Button>
            <Button variant="solid" onPress={handleApply}>
              {t('HOME.FILTERS_MODAL.APPLY_BUTTON')}
            </Button>
          </HStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
