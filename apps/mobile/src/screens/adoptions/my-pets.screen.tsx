import { MyPetsList } from './compose/my-pets-list';

import Delimiter from '@/components/delimiter';
import SafeArea from '@/components/safe-area';
import usePets from '@/hooks/use-pets/use-pets';

const MyPetsScreen = () => {
  const { myPets } = usePets();

  return (
    <SafeArea>
      <Delimiter>
        <MyPetsList pets={myPets} />
      </Delimiter>
    </SafeArea>
  );
};

export default MyPetsScreen;
