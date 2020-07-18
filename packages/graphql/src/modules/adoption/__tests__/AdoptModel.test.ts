import {connectMongoose, disconnectMongoose, clearDbAndRestartCounters} from '../../../../tests/helpers';
import AdoptModel, {IAdoptionDocument} from '../AdoptionModel';
import UserModel, {IUser} from '../../user/UserModel';

describe('Adoption model', () => {
  beforeAll(connectMongoose);
  beforeEach(clearDbAndRestartCounters);
  afterAll(disconnectMongoose);

  describe('Create adoption', () => {
    describe('when adopt is valid', () => {
      it('inserts an adoption', async () => {
        const user = await new UserModel({
          emails: [
            {
              email: 'fakeemail@fake.com',
              providedBy: 'google',
            },
          ],
          ids: [
            {
              id: 'googlefakeid',
              providedBy: 'google',
            },
          ],
          name: 'Fake Short Name',
        } as IUser).save();

        await new AdoptModel({
          user: user._id,
          name: 'Fake name',
          gender: 'male',
          breed: 'shitzu',
          type: 'dog',
          age: 3,
          size: 'small',
          photos: ['s3-url', 's3-url'],
          observations: '',
        } as IAdoptionDocument).save();

        const count = await AdoptModel.count({});
        expect(count).toBe(1);
      });
    });

    describe('when adoption is invalid', () => {
      it('throws an validation error', async () => {
        let error = null;

        try {
          await new AdoptModel({
            name: 'teste',
            breed: 'shitzu',
            type: 'dog',
            age: 3,
          } as IAdoptionDocument).save();
        } catch (er) {
          error = er;
        }

        const count = await AdoptModel.count({});
        expect(count).toBe(0);
        expect(error).not.toBeNull();
      });
    });
  });
});
