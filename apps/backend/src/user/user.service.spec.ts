import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { userMock } from '../../test/mocks/user';
import { UserRepository } from './entities/user-entities.interface';
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
    it('should create a new user', () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'create').mockResolvedValueOnce(userMock);
      expect(service.create(userMock)).resolves.toEqual(userMock);
    });

    it('should throw if email is already taken', () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(userMock);
      expect(service.create(userMock)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });
  });

  describe('findById', () => {
    it('should find a user by his id', () => {
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);
      expect(service.findById(userMock.id)).resolves.toEqual(userMock);
    });
  });

  describe('findByEmail', () => {
    it('should find a user by his email', () => {
      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(userMock);
      expect(service.findByEmail(userMock.email)).resolves.toEqual(userMock);
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(userMock);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateUser);
      expect(
        service.update('some_id', {
          name: 'Gilberto',
        }),
      ).resolves.toEqual(updateUser);
    });

    it('should throw if user does not exist', () => {
      const updateUser = { ...userMock, name: 'Gilberto' };
      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateUser);
      expect(
        service.update('some_id', {
          name: 'Gilberto',
        }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
