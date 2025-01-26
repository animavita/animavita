import { Adoption, MyPetsList } from '@/screens/adoptions/compose/my-pets-list';
import { renderWithProviders, screen } from '@/test/test-utils';

describe('<MyPetsList />', () => {
  describe('when user has not put pets for adoptions yet', () => {
    it('renders an empty message', () => {
      renderWithProviders(<MyPetsList pets={[]} />);

      const emptyListMsg = screen.getByText('Você ainda não registou nenhum pet para adoção');

      expect(emptyListMsg).toBeOnTheScreen();
    });
  });

  describe('when user has pets for adoptions', () => {
    it('renders registered pets in a list', () => {
      renderWithProviders(<MyPetsList pets={DATA as Adoption[]} />);

      for (const pet of DATA) {
        const petName = pet.name.toUpperCase();
        expect(screen.getByText(petName)).toBeOnTheScreen();
      }
    });
  });
});

const DATA = [
  {
    id: '1',
    age: 'young',
    name: 'pet 1',
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
    name: 'pet 2',
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
    name: 'pet 3',
    size: 'small',
    type: 'cat',
    breed: 'breed',
    gender: 'male',
    observations: '',
    photos: [''],
  },
];
