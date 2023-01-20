import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { userMock } from '../../test/mocks/user';
import { UserRepository } from './repositories/user-repository.interface';
import { UserService } from './user.service';

const repositoryMock = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'MONGODB',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>('MONGODB');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UserRepository', () => {
    it('should be defined', () => {
      expect(repository).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(userMock);
      await expect(service.create(userMock)).resolves.toEqual(userMock);
    });

    it('should throw if email is already taken', async () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(userMock);
      await expect(service.create(userMock)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('findById', () => {
    it('should find a user by his id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);
      await expect(service.findById(userMock.id)).resolves.toEqual(userMock);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by his email', async () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(userMock);
      await expect(service.findByEmail(userMock.email)).resolves.toEqual(
        userMock,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateUser);
      await expect(
        service.update('some_id', {
          name: 'Gilberto',
        }),
      ).resolves.toEqual(updateUser);
    });

    it('should throw if user does not exist', async () => {
      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateUser);
      await expect(
        service.update('some_id', {
          name: 'Gilberto',
        }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
