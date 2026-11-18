import GetMyAdoptionRequests from './get-my-adoption-requests';
import UserRepository from '../../../repositories/user.repository';
import {
  AdoptionRequestDao,
  AdoptionRequestRecord,
} from '../../../dao/adoption-request.dao';
import { User } from '../../../../domain/user/user';
import { Email } from '../../../../domain/email/email';
import { UserPhoneNumber } from '../../../../domain/phone-number/phone-number';
import Location from '../../../../domain/location/location';
import { UserRole, UserRoles } from '../../../../domain/role/role';
import { NotFoundError } from '../../../../domain/errors/not-found.error';
import { faker } from '@faker-js/faker';

const OWNER_PHONE = '+5511911111111';
const ADOPTER_PHONE = '+5511922222222';

type Role = typeof UserRoles[keyof typeof UserRoles];

const aUser = (id: string, role: Role) =>
  User.create({
    id,
    email: Email.create(`${role}@test.com`),
    name: role,
    password: 'hashed-password',
    phoneNumber: UserPhoneNumber.create('+5511999999999'),
    role: UserRole.create(role),
    location: new Location(-46.63, -23.55),
  });

const aRecord = (
  overrides: Partial<AdoptionRequestRecord> = {},
): AdoptionRequestRecord => ({
  id: 'req-1',
  status: 'pending',
  denialReason: null,
  contactShared: false,
  petId: 'pet-1',
  adopterId: 'adopter-1',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  pet: {
    id: 'pet-1',
    name: 'Rex',
    breed: 'Labrador',
    type: 'dog',
    owner: { id: 'owner-1', name: 'Owner' },
  },
  adopter: { id: 'adopter-1', name: 'Adopter' },
  ownerPhoneNumber: OWNER_PHONE,
  adopterPhoneNumber: ADOPTER_PHONE,
  ...overrides,
});

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
      userRepository.getById.mockResolvedValue(
        aUser(adopterId, UserRoles.Adopter),
      );
      adoptionRequestDao.getByAdopter.mockResolvedValue([aRecord()]);

      const result = await getMyAdoptionRequests.execute(adopterId);

      expect(adoptionRequestDao.getByAdopter).toHaveBeenCalledWith(adopterId);
      expect(adoptionRequestDao.getByOwner).not.toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 'req-1',
          status: 'pending',
          denialReason: null,
          contactShared: false,
          petId: 'pet-1',
          adopterId: 'adopter-1',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
          pet: {
            id: 'pet-1',
            name: 'Rex',
            breed: 'Labrador',
            type: 'dog',
            owner: { id: 'owner-1', name: 'Owner', phoneNumber: null },
          },
          adopter: { id: 'adopter-1', name: 'Adopter', phoneNumber: null },
        },
      ]);
    });
  });

  describe('for owner', () => {
    it('should return requests received for owner pets', async () => {
      const ownerId = faker.string.uuid();
      userRepository.getById.mockResolvedValue(aUser(ownerId, UserRoles.Owner));
      adoptionRequestDao.getByOwner.mockResolvedValue([aRecord()]);

      const result = await getMyAdoptionRequests.execute(ownerId);

      expect(adoptionRequestDao.getByOwner).toHaveBeenCalledWith(ownerId);
      expect(adoptionRequestDao.getByAdopter).not.toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('req-1');
    });
  });

  describe('phone numbers', () => {
    const readAs = async (role: Role, record: AdoptionRequestRecord) => {
      userRepository.getById.mockResolvedValue(aUser('user-1', role));
      adoptionRequestDao.getByAdopter.mockResolvedValue([record]);
      adoptionRequestDao.getByOwner.mockResolvedValue([record]);

      const [request] = await getMyAdoptionRequests.execute('user-1');
      return request;
    };

    describe.each([UserRoles.Owner, UserRoles.Adopter])(
      'read by the %s',
      (role) => {
        it('are absent while contact has not been shared', async () => {
          const request = await readAs(role, aRecord({ contactShared: false }));

          expect(request.pet.owner.phoneNumber).toBeNull();
          expect(request.adopter.phoneNumber).toBeNull();
          expect(JSON.stringify(request)).not.toContain(OWNER_PHONE);
          expect(JSON.stringify(request)).not.toContain(ADOPTER_PHONE);
        });

        it.each(['pending', 'accepted'] as const)(
          'are both present on a shared %s request',
          async (status) => {
            const request = await readAs(
              role,
              aRecord({ contactShared: true, status }),
            );

            expect(request.pet.owner.phoneNumber).toBe(OWNER_PHONE);
            expect(request.adopter.phoneNumber).toBe(ADOPTER_PHONE);
          },
        );

        it.each(['denied', 'cancelled'] as const)(
          'are hidden again once a shared request is %s, while the request stays marked as shared',
          async (status) => {
            const request = await readAs(
              role,
              aRecord({ contactShared: true, status }),
            );

            expect(request.contactShared).toBe(true);
            expect(JSON.stringify(request)).not.toContain(OWNER_PHONE);
            expect(JSON.stringify(request)).not.toContain(ADOPTER_PHONE);
          },
        );
      },
    );

    it('shows a missing adopter number as absent on a shared request', async () => {
      const request = await readAs(
        UserRoles.Owner,
        aRecord({ contactShared: true, adopterPhoneNumber: null }),
      );

      expect(request.pet.owner.phoneNumber).toBe(OWNER_PHONE);
      expect(request.adopter.phoneNumber).toBeNull();
    });

    it('does not leak the raw record fields', async () => {
      const request = await readAs(
        UserRoles.Owner,
        aRecord({ contactShared: true }),
      );

      expect(request).not.toHaveProperty('ownerPhoneNumber');
      expect(request).not.toHaveProperty('adopterPhoneNumber');
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
