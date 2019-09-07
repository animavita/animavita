export const getAnimalGender = (gender) => {
  const genders = [
    {
      key: 'male',
      trans: 'Macho'
    },
    {
      key: 'female',
      trans: 'Fêmea'
    }
  ];

  return genders.find(element => element.key === gender).trans;
};

export const getAnimalSize = (size) => {
  const sizes = [
    {
      key: 'small',
      trans: 'Pequeno'
    },
    {
      key: 'medium',
      trans: 'Médio'
    },
    {
      key: 'bigger',
      trans: 'Grande'
    }
  ];

  return sizes.find(element => element.key === size).trans;
};
