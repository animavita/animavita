import GetMyAdoptionRequests from './get-my-adoption-requests';
import UserRepository from '../../../repositories/user.repository';
import { AdoptionRequestDao } from '../../../dao/adoption-request.dao';
import { User } from '../../../../domain/user/user';
import { Email } from '../../../../domain/email/email';
import { UserPhoneNumber } from '../../../../domain/phone-number/phone-number';
import Location from '../../../../domain/location/location';
import { UserRole, UserRoles } from '../../../../domain/role/role';
import { AdoptionRequestDto } from '../../../dto/adoption-request.dto';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import { faker } from '@faker-js/faker';

describe('GetMyAdoptionRequests', () => {
  let getMyAdoptionRequests: GetMyAdoptionRequests;
  let userRepository: jest.Mocked<UserRepository>;
  let adoptionRequestDao: jest.Mocked<AdoptionRequestDao>;

  beforeEach(() => {
    userRepository = {
      getById: jest.fn(),
    } as any;

    adoptionRequestDao = {
      getByAdopter: jest.fn(),
      getByOwner: jest.fn(),
    } as any;

    getMyAdoptionRequests = new GetMyAdoptionRequests(
      userRepository,
      adoptionRequestDao,
    );
  });

  describe('for adopter', () => {
    it('should return requests placed by adopter', async () => {
      const adopterId = faker.string.uuid();
      const adopter = User.create({
        id: adopterId,
        email: Email.create('adopter@test.com'),
        name: 'Adopter',
        password: 'hashed-password',
        phoneNumber: UserPhoneNumber.create('+5511999999999'),
        role: UserRole.create(UserRoles.Adopter),
        location: new Location(-46.63, -23.55),
      });

      const mockRequests: AdoptionRequestDto[] = [
        {
          id: 'req-1',
          status: 'pending',
          petId: 'pet-1',
          adopterId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pet: {
            id: 'pet-1',
            name: 'Rex',
            breed: 'Labrador',
            type: 'dog',
            owner: {
              id: 'owner-1',
              name: 'Owner',
            },
          },
          adopter: {
            id: adopterId,
            name: 'Adopter',
          },
        },
      ];

      userRepository.getById.mockResolvedValue(adopter);
      adoptionRequestDao.getByAdopter.mockResolvedValue(mockRequests);

      const result = await getMyAdoptionRequests.execute(adopterId);

      expect(userRepository.getById).toHaveBeenCalledWith(adopterId);
      expect(adoptionRequestDao.getByAdopter).toHaveBeenCalledWith(adopterId);
      expect(adoptionRequestDao.getByOwner).not.toHaveBeenCalled();
      expect(result).toEqual(mockRequests);
    });
  });

  describe('for owner', () => {
    it('should return requests received for owner pets', async () => {
      const ownerId = faker.string.uuid();
      const owner = User.create({
        id: ownerId,
        email: Email.create('owner@test.com'),
        name: 'Owner',
        password: 'hashed-password',
        phoneNumber: UserPhoneNumber.create('+5511999999999'),
        role: UserRole.create(UserRoles.Owner),
        location: new Location(-46.63, -23.55),
      });

      const mockRequests: AdoptionRequestDto[] = [
        {
          id: 'req-1',
          status: 'pending',
          petId: 'pet-1',
          adopterId: 'adopter-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pet: {
            id: 'pet-1',
            name: 'Rex',
            breed: 'Labrador',
            type: 'dog',
            owner: {
              id: ownerId,
              name: 'Owner',
            },
          },
          adopter: {
            id: 'adopter-1',
            name: 'Adopter',
          },
        },
      ];

      userRepository.getById.mockResolvedValue(owner);
      adoptionRequestDao.getByOwner.mockResolvedValue(mockRequests);

      const result = await getMyAdoptionRequests.execute(ownerId);

      expect(userRepository.getById).toHaveBeenCalledWith(ownerId);
      expect(adoptionRequestDao.getByOwner).toHaveBeenCalledWith(ownerId);
      expect(adoptionRequestDao.getByAdopter).not.toHaveBeenCalled();
      expect(result).toEqual(mockRequests);
    });
  });

  describe('error cases', () => {
    it('should throw NotFoundError when user does not exist', async () => {
      userRepository.getById.mockResolvedValue(null);

      await expect(
        getMyAdoptionRequests.execute('non-existent-id'),
      ).rejects.toThrow(NotFoundError);
      await expect(
        getMyAdoptionRequests.execute('non-existent-id'),
      ).rejects.toThrow('User not found');
    });
  });
});
