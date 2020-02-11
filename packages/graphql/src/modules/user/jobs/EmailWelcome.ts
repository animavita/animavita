import UserModel, {IUser} from '../UserModel';

type Data = {
  userId: string;
};

export default async ({userId}: Data) => {
  if (!userId) {
    // eslint-disable-next-line no-console
    console.log('Missing userId');
    return;
  }

  const user = await UserModel.findOne({_id: userId}).lean<IUser>();

  if (!user) {
    // eslint-disable-next-line no-console
    console.log(`Could not find user with userId: ${userId}`);
    return;
  }

  // eslint-disable-next-line no-console
  console.log(user);
};
