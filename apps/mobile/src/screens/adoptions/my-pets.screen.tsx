import { Box, Heading, Text } from 'native-base';

import { Adoption, MyPetsList } from './compose/my-pets-list';

import SafeArea from '@/components/safe-area';
import Topbar from '@/components/topbar';
import useLocale from '@/hooks/use-locale';

const MyPetsScreen = () => {
  const { t } = useLocale();

  return (
    <SafeArea>
      <Box py={8} px={4}>
        <Topbar />
        <Box mt={4}>
          <Heading size="xl" color="primary.500">
            {t('MY_PETS_SCREEN.TITLE')}
          </Heading>
          <Text mt={1} color="coolGray.500">
            {t('MY_PETS_SCREEN.SUB_TITLE')}
          </Text>
        </Box>
        <Box mt="6" py={8}>
          <MyPetsList adoptions={DATA as Adoption[]} />
        </Box>
      </Box>
    </SafeArea>
  );
};

const DATA = [
  {
    id: '1',
    age: 'young',
    name: 'kaka',
    size: 'small',
    type: 'dog',
    breed: 'breed',
    gender: 'male',
    observations: '',
    photos: [''],
  },
  {
    id: '2',
    age: 'young',
    name: 'killua',
    size: 'small',
    type: 'cat',
    breed: 'breed',
    gender: 'male',
    observations: '',
    photos: [''],
  },
  {
    id: '3',
    age: 'young',
    name: 'pitou',
    size: 'small',
    type: 'cat',
    breed: 'breed',
    gender: 'male',
    observations: '',
    photos: [''],
  },
];

export default MyPetsScreen;
