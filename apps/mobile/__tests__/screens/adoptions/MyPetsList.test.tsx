import { MyPetsList } from '@/screens/adoptions/compose/adoptions-list';
import { renderWithProviders } from '@/test/test-utils';

describe('<MyPetsList />', () => {
  it('shows a message that user has not registered yet pets to adoption', () => {
    const { getByText } = renderWithProviders(<MyPetsList adoptions={[]} />);

    const emptyListMsg = getByText('Você ainda não registou nenhum pet para adoção');

    expect(emptyListMsg).toBeOnTheScreen();
  });

  it('renders a list if user has not registered yet pets to adoption', () => {
    const { getByText } = renderWithProviders(<MyPetsList adoptions={DATA} />);

    const pet1 = 'pet 1'.toUpperCase();
    const pet2 = 'pet 2'.toUpperCase();
    const pet3 = 'pet 3'.toUpperCase();

    expect(getByText(pet1)).toBeOnTheScreen();
    expect(getByText(pet2)).toBeOnTheScreen();
    expect(getByText(pet3)).toBeOnTheScreen();
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
