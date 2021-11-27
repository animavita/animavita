import {makeWithInvariants} from '../../../shared/domain/invariantsFactory';

namespace Pet {
  type Pet = Readonly<{
    id: string;
    name: string;
    description?: string;
    photos: string[];
    location: {
      type: 'Point';
      coordinates: number[];
    };
    gender: 'male' | 'female';
    specie: 'cat' | 'dog' | 'others';
    age?: number;
    size?: 'small' | 'medium' | 'big';
  }>;

  const withInvariants = makeWithInvariants<Pet>((self, assert) => {
    assert(self.photos.length > 0, 'At least one photo must be provided');
    assert(self.name.length >= 3, "The pet's name must have at least 3 letter");
  });

  export const create = withInvariants(
    (data: Pet): Pet => ({
      id: data.id,
      name: data.name,
      description: data.description,
      location: data.location,
      gender: data.gender,
      photos: data.photos,
      specie: data.specie,
      age: data.age,
      size: data.size,
    }),
  );

  export type Type = Pet;
}

export {Pet};
