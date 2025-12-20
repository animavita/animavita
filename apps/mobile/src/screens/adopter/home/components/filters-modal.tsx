import { Actionsheet, Box, Button, HStack, Slider, Text, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';

import useLocale from '@/hooks/use-locale';

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentRadius: number;
  onApply: (radius: number) => void;
};

export const FiltersModal = ({ isOpen, onClose, currentRadius, onApply }: FiltersModalProps) => {
  const { t } = useLocale();
  const [radius, setRadius] = useState(currentRadius);

  // Sync with prop changes
  useEffect(() => {
    setRadius(currentRadius);
  }, [currentRadius]);

  const handleApply = () => {
    onApply(radius);
    onClose();
  };

  const handleCancel = () => {
    setRadius(currentRadius);
    onClose();
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={handleCancel}>
      <Actionsheet.Content>
        <Box width="100%" px={4} py={6}>
          <Text fontSize="lg" fontWeight="bold" mb={6}>
            {t('HOME.FILTERS_MODAL.TITLE')}
          </Text>

          <VStack space={4} mb={6}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="md" fontWeight="medium">
                {t('HOME.FILTERS_MODAL.RADIUS_LABEL')}
              </Text>
              <Text fontSize="md" color="primary.600" fontWeight="semibold">
                {t('HOME.FILTERS_MODAL.RADIUS_VALUE', { value: radius })}
              </Text>
            </HStack>

            <Slider
              defaultValue={currentRadius}
              minValue={5}
              maxValue={100}
              step={5}
              value={radius}
              onChange={(value) => setRadius(value)}
              accessibilityLabel={t('HOME.FILTERS_MODAL.RADIUS_LABEL')}
            >
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>

            <HStack justifyContent="space-between">
              <Text fontSize="xs" color="gray.500">
                5 km
              </Text>
              <Text fontSize="xs" color="gray.500">
                100 km
              </Text>
            </HStack>
          </VStack>

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
