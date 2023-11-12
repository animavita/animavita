import {
  Coordinates,
  CreateUserRequest,
  SignInRequest,
  UpdateUserRequest,
} from '@animavita/types';

import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';

type UserPropertyOptions = {
  [key: string]: ApiPropertyOptions;
};

const userPropertyOptions: UserPropertyOptions = {
  id: {
    description: 'The id of the user',
    type: String,
    example: '5f8b0f8f-9f8c-4a9a-9b4a-3d9a3d9a3d9a',
  },
  name: {
    description: 'The name of the user',
    example: 'John Doe',
    type: String,
  },
  email: {
    description: 'The email of the user',
    type: String,
    example: 'example@email.com',
  },
  password: {
    description: 'The password of the user',
    example: '123456',
    type: String,
  },
  photoUri: {
    description: 'The URI of the user photo',
    type: String,
    example: 'https://www.example.com/photo.jpg',
  },
  location: {
    description: 'The location of the user',
    type: 'object',
    properties: {
      latitude: {
        description: 'The latitude of the user',
        type: 'Number',
        example: -23.5505199,
      },
      longitude: {
        description: 'The longitude of the user',
        type: 'Number',
        example: -46.6333094,
      },
    },
  },
};

export class CreateUserDTO implements CreateUserRequest {
  @ApiProperty(userPropertyOptions.email)
  email: string;
  @ApiProperty(userPropertyOptions.location)
  location: Coordinates;
  @ApiProperty(userPropertyOptions.name)
  name: string;
  @ApiProperty(userPropertyOptions.password)
  password: string;
  @ApiPropertyOptional(userPropertyOptions.photoUri)
  photoUri?: string;
}

export class UpdateUserDTO implements UpdateUserRequest {
  @ApiProperty({ ...userPropertyOptions.id, required: true })
  email: string;
  @ApiPropertyOptional(userPropertyOptions.email)
  id: string;
  @ApiPropertyOptional(userPropertyOptions.location)
  location: Coordinates;
  @ApiPropertyOptional(userPropertyOptions.name)
  name: string;
  @ApiPropertyOptional(userPropertyOptions.password)
  password: string;
  @ApiPropertyOptional(userPropertyOptions.photoUri)
  photoUri?: string;
}

export class UserSignInDTO implements SignInRequest {
  @ApiProperty(userPropertyOptions.email)
  email: string;
  @ApiProperty(userPropertyOptions.password)
  password: string;
}
