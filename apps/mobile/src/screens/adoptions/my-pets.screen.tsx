import { MyPetsList } from './compose/my-pets-list';

import PageDelimiter from '@/components/delimiter';
import SafeArea from '@/components/safe-area';
import usePets from '@/hooks/use-pets/use-pets';

const MyPetsScreen = () => {
  const { myPets } = usePets();

  return (
    <SafeArea>
      <PageDelimiter>
        <MyPetsList pets={myPets} />
      </PageDelimiter>
    </SafeArea>
  );
};

export default MyPetsScreen;
