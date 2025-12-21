import Slider from '@react-native-community/slider';
import { VStack, HStack, Box, theme, Text } from 'native-base';
import { useEffect, useState } from 'react';

import useLocale from '@/hooks/use-locale';

type SearchRadiusProps = {
  currentRadius: number;
  onChange: (value: number) => void;
};

export const SearchRadius = ({ currentRadius, onChange }: SearchRadiusProps) => {
  const [radius, setRadius] = useState(currentRadius);
  const { t } = useLocale();

  useEffect(() => {
    setRadius(currentRadius);
  }, [currentRadius]);

  return (
    <VStack mb={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="md" fontWeight="medium">
          {t('HOME.FILTERS_MODAL.RADIUS_LABEL')}
        </Text>
        <Text fontSize="md" color="primary.600" fontWeight="semibold">
          {t('HOME.FILTERS_MODAL.RADIUS_VALUE', { value: radius })}
        </Text>
      </HStack>

      <Box _android={{ mx: -4, mt: 2 }}>
        <Slider
          minimumValue={5}
          maximumValue={100}
          step={5}
          value={radius}
          onValueChange={(value) => {
            setRadius(value);
            onChange(value);
          }}
          minimumTrackTintColor={theme.colors.primary[500]}
          maximumTrackTintColor={theme.colors.gray[300]}
          thumbTintColor={theme.colors.primary[500]}
          accessibilityLabel={t('HOME.FILTERS_MODAL.RADIUS_LABEL')}
        />
      </Box>

      <HStack justifyContent="space-between">
        <Text fontSize="xs" color="gray.500">
          5 km
        </Text>
        <Text fontSize="xs" color="gray.500">
          100 km
        </Text>
      </HStack>
    </VStack>
  );
};
