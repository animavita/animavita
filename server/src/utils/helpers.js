export const getAnimalGender = (gender) => {
  const genders = [
    {
      key: 'male',
      translate: 'Macho'
    },
    {
      key: 'female',
      translate: 'Fêmea'
    }
  ];

  return genders.find(element => element.key === gender).translate;
};

export const getAnimalSize = (size) => {
  const sizes = [
    {
      key: 'small',
      translate: 'Pequeno'
    },
    {
      key: 'medium',
      translate: 'Médio'
    },
    {
      key: 'bigger',
      translate: 'Grande'
    }
  ];

  return sizes.find(element => element.key === size).translate;
};
