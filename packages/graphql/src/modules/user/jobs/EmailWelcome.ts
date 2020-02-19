import UserModel, {IUserDocument} from '../UserModel';
import {sendEmail} from '../../../common/email';

type Data = {
  userId: string;
};

export default async ({userId}: Data) => {
  if (!userId) {
    // eslint-disable-next-line no-console
    console.log('Missing userId');
    return;
  }

  const user = await UserModel.findOne({_id: userId}).lean<IUserDocument>();

  if (!user) {
    // eslint-disable-next-line no-console
    console.log(`Could not find user with userId: ${userId}`);
    return;
  }

  await sendEmail({
    userId: user._id,
    email: user.emails[0].email,
    subject: 'Prazer em te conhecer 😄',
    htmlBody: 'Estamos muito felizes por ter você aqui. Aproveite o app.',
    emailType: 'EMAIL_WELCOME',
  });
};
