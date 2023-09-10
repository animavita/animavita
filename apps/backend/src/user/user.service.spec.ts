import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { userMock } from '../../test/mocks/user';
import { UserService } from './user.service';
import { DataServices } from '../core/abstracts/data-services.abstract';

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
        provide: DataServices,
        useValue: { users: repositoryMock },
      },
    ],
  }).compile();

  const service = module.get<UserService>(UserService);
  const repository = module.get<DataServices>(DataServices);

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
      jest.spyOn(repository.users, 'findByEmail').mockResolvedValueOnce(null);
      jest.spyOn(repository.users, 'create').mockResolvedValueOnce(userMock);
      await expect(service.create(userMock)).resolves.toEqual(userMock);
    });

    it('should throw if email is already taken', async () => {
      const { service, repository } = await setup();
      jest
        .spyOn(repository.users, 'findByEmail')
        .mockResolvedValueOnce(userMock);
      await expect(service.create(userMock)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('findById', () => {
    it('should find a user by their id', async () => {
      const { service, repository } = await setup();

      jest.spyOn(repository.users, 'findById').mockResolvedValueOnce(userMock);
      await expect(service.findById(userMock.id)).resolves.toEqual(userMock);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by their email', async () => {
      const { service, repository } = await setup();

      jest
        .spyOn(repository.users, 'findByEmail')
        .mockResolvedValueOnce(userMock);
      await expect(service.findByEmail(userMock.email)).resolves.toEqual(
        userMock,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const { service, repository } = await setup();

      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository.users, 'findById').mockResolvedValueOnce(userMock);
      jest.spyOn(repository.users, 'update').mockResolvedValueOnce(updateUser);
      await expect(
        service.update('123', {
          name: 'Gilberto',
        }),
      ).resolves.toEqual(updateUser);
    });

    it('should throw if user does not exist', async () => {
      const { service, repository } = await setup();

      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository.users, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(repository.users, 'update').mockResolvedValueOnce(updateUser);
      await expect(
        service.update('abc', {
          name: 'Gilberto',
        }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
