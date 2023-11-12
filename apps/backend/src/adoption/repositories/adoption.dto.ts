import {
  AnimalAgesType,
  AnimalGendersType,
  AnimalSizesType,
  AnimalType,
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
} from '@animavita/types';

import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';

type AdoptionPropertyOptions = {
  [key: string]: ApiPropertyOptions;
};

const adoptionPropertyOptions: AdoptionPropertyOptions = {
  id: {
    description: 'The id of the adoption',
    type: String,
    example: '5f8b0f8f-9f8c-4a9a-9b4a-3d9a3d9a3d9a',
  },
  name: {
    description: 'The first name of the user',
    type: String,
    example: 'John Doe',
  },

  gender: {
    description: 'The gender of the animal',
    type: 'enum',
    enum: ['male', 'female'],
    example: 'male',
  },
  breed: {
    description: 'The breed of the animal',
    example: 'Labrador Retriever',
    type: String,
  },
  type: {
    description: 'The type of animal (e.g., dog, cat)',
    type: 'enum',
    enum: ['dog', 'cat', 'other'],
    example: 'Dog',
  },
  age: {
    description: 'The age of the animal',
    type: 'enum',
    enum: ['puppy', 'young', 'adult', 'senior'],
    example: 'Young',
  },
  size: {
    description: 'The size of the animal',
    type: 'enum',
    enum: ['small', 'medium', 'big'],
    example: 'Medium',
  },
  observations: {
    description: 'Additional observations about the animal',
    example: 'Friendly and well-behaved.',
    type: String,
  },
  photos: {
    description: 'An array of photo URLs for the animal',
    type: [String],
    example: [
      'https://example.com/photo1.jpg',
      'https://example.com/photo2.jpg',
    ],
  },
};

export class UpdateAdoptionDTO implements UpdateAdoptionRequest {
  @ApiProperty({ ...adoptionPropertyOptions.id, required: true })
  id: string;
  @ApiPropertyOptional(adoptionPropertyOptions.name)
  name?: string;
  @ApiPropertyOptional(adoptionPropertyOptions.gender)
  gender?: AnimalGendersType;
  @ApiPropertyOptional(adoptionPropertyOptions.breed)
  breed?: string;
  @ApiPropertyOptional(adoptionPropertyOptions.type)
  type?: AnimalType;
  @ApiPropertyOptional(adoptionPropertyOptions.age)
  age?: AnimalAgesType;
  @ApiPropertyOptional(adoptionPropertyOptions.size)
  size?: AnimalSizesType;
  @ApiPropertyOptional(adoptionPropertyOptions.observations)
  observations?: string;
  @ApiPropertyOptional(adoptionPropertyOptions.photos)
  photos?: string[];
}

export class CreateAdoptionDTO implements CreateAdoptionRequest {
  @ApiProperty(adoptionPropertyOptions.name)
  name: string;
  @ApiProperty(adoptionPropertyOptions.gender)
  gender: AnimalGendersType;
  @ApiProperty(adoptionPropertyOptions.breed)
  breed: string;
  @ApiProperty(adoptionPropertyOptions.type)
  type: AnimalType;
  @ApiProperty(adoptionPropertyOptions.age)
  age: AnimalAgesType;
  @ApiProperty(adoptionPropertyOptions.size)
  size: AnimalSizesType;
  @ApiProperty(adoptionPropertyOptions.observations)
  observations: string;
  @ApiProperty(adoptionPropertyOptions.photos)
  photos: string[];
}
