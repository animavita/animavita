import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { userMock } from '../../test/mocks/user';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user-repository.interface';

const repositoryMock = {
  create: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  update: jest.fn(),
};

const setup = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      {
        provide: UserRepository,
        useValue: repositoryMock,
      },
    ],
  }).compile();

  const service = module.get<UserService>(UserService);
  const repository = module.get<UserRepository>(UserRepository);

  return {
    service,
    repository,
  };
};

describe('UserService', () => {
  it('should be defined', async () => {
    const { service } = await setup();
    expect(service).toBeDefined();
  });

  describe('UserRepository', () => {
    it('should be defined', async () => {
      const { repository } = await setup();
      expect(repository).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const { service, repository } = await setup();
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(userMock);
      await expect(service.create(userMock)).resolves.toEqual(userMock);
    });

    it('should throw if email is already taken', async () => {
      const { service, repository } = await setup();
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(userMock);
      await expect(service.create(userMock)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('findById', () => {
    it('should find a user by their id', async () => {
      const { service, repository } = await setup();

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);
      await expect(service.findById(userMock.id)).resolves.toEqual(userMock);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by their email', async () => {
      const { service, repository } = await setup();

      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(userMock);
      await expect(service.findByEmail(userMock.email)).resolves.toEqual(
        userMock,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const { service, repository } = await setup();

      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateUser);
      await expect(
        service.update('123', {
          name: 'Gilberto',
        }),
      ).resolves.toEqual(updateUser);
    });

    it('should throw if user does not exist', async () => {
      const { service, repository } = await setup();

      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateUser);
      await expect(
        service.update('abc', {
          name: 'Gilberto',
        }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
