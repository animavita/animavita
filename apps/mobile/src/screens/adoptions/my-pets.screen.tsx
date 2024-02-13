import { Adoption, MyPetsList } from './compose/my-pets-list';

import Delimiter from '@/components/delimiter';
import SafeArea from '@/components/safe-area';

const MyPetsScreen = () => {
  return (
    <SafeArea>
      <Delimiter>
        <MyPetsList adoptions={DATA as Adoption[]} />
      </Delimiter>
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
