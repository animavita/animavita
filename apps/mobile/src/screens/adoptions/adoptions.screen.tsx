import { Box } from 'native-base';

import { AdoptionsList } from './components/adoptions-list';
import { Header } from './components/header';

import SafeArea from '@/components/safe-area';

const MyAdoptionsScreen = () => {
  return (
    <SafeArea>
      <Box py={8} px={4}>
        <Header />
        <AdoptionsList adoptions={DATA} />
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

export default MyAdoptionsScreen;
