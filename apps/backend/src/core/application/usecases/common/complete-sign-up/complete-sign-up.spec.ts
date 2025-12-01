import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  TestMongoDataServicesModule,
} from '../../../../../../test/utils/in-memory-mongo';
import { UserService } from '../../../../../user/user.service';
import CompleteSignUp from './complete-sign-up';
import { userFactory } from '../../../../../../test/factories/user';
import { UserRoles } from '../../../../domain/role/role';

const testUser = userFactory.build();

describe('CompleteSignUp', () => {
  let app: INestApplication;
  let completeSignUp: CompleteSignUp;
  let userService: UserService;

  beforeEach(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [TestMongoDataServicesModule],
      providers: [UserService, CompleteSignUp],
    }).compile();

    app = fixture.createNestApplication();
    userService = fixture.get<UserService>(UserService);
    completeSignUp = fixture.get<CompleteSignUp>(CompleteSignUp);

    await app.init();
  });

  describe('when completing sign up with location and role', () => {
    it('updates user with location and role', async () => {
      const createdUser = await userService.create(testUser);

      const input = {
        location: {
          latitude: 40.75783,
          longitude: -73.98911,
        },
        role: UserRoles.Owner,
      };

      const result = await completeSignUp.execute(createdUser.id, input);

      expect(result.location).toEqual(input.location);
      expect(result.role).toBe(UserRoles.Owner);
    });
  });

  describe('when completing sign up with only location', () => {
    it('updates user with location only', async () => {
      const createdUser = await userService.create(testUser);

      const input = {
        location: {
          latitude: 40.75783,
          longitude: -73.98911,
        },
      };

      const result = await completeSignUp.execute(createdUser.id, input);

      expect(result.location).toEqual(input.location);
      expect(result.role).toBeUndefined();
    });
  });

  describe('when completing sign up with only role', () => {
    it('updates user with role only', async () => {
      const createdUser = await userService.create(
        userFactory.build({ location: undefined }),
      );

      const input = {
        role: UserRoles.Adopter,
      };

      const result = await completeSignUp.execute(createdUser.id, input);

      expect(result.location).toBeUndefined();
      expect(result.role).toBe(UserRoles.Adopter);
    });
  });

  describe('when trying to assign admin role', () => {
    it('throws an error', async () => {
      const createdUser = await userService.create(testUser);

      const input = {
        role: UserRoles.Admin,
      };

      await expect(
        completeSignUp.execute(createdUser.id, input),
      ).rejects.toThrowError('Cannot assign admin role to user');
    });
  });

  describe('when completing sign up with phone number', () => {
    it('updates user with phone number', async () => {
      const createdUser = await userService.create(testUser);

      const input = {
        phoneNumber: '+1234567890',
      };

      const result = await completeSignUp.execute(createdUser.id, input);

      expect(result.phoneNumber).toBe('+1234567890');
    });
  });

  describe('when completing sign up with location, role, and phone number', () => {
    it('updates user with all fields', async () => {
      const createdUser = await userService.create(testUser);

      const input = {
        location: {
          latitude: 40.75783,
          longitude: -73.98911,
        },
        role: UserRoles.Owner,
        phoneNumber: '+1234567890',
      };

      const result = await completeSignUp.execute(createdUser.id, input);

      expect(result.location).toEqual(input.location);
      expect(result.role).toBe(UserRoles.Owner);
      expect(result.phoneNumber).toBe('+1234567890');
    });
  });

  afterEach(async () => {
    await app.close();
    await closeInMongodConnection();
  });
});
