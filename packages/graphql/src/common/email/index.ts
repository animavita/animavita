import {SES} from 'aws-sdk';

import EmailSent, {EMAIL_TYPES, EMAILS} from './EmailSentModel';

interface SendEmailParams {
  userId: string;
  email: string;
  subject: string;
  htmlBody: string;
  emailType: EMAIL_TYPES;
}

export async function sendEmail(params: SendEmailParams) {
  const {userId, email, subject, htmlBody, emailType} = params;

  if (!email) {
    // eslint-disable-next-line no-console
    console.log('User without email:', params);
    return;
  }

  const emailSource = {
    name: 'Animavita',
    email: 'animavitaapp@gmail.com',
  };

  const emailSent = await new EmailSent({
    user: userId,
    emailAddress: email,
    emailSubject: subject,
    emailHtml: htmlBody,
    emailSenderName: emailSource.name,
    emailSenderAddress: emailSource.email,
    emailType: EMAILS[emailType],
  }).save();

  const ses = new SES();

  const data: SES.SendEmailRequest = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Data: htmlBody,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: `${emailSource.name} <${emailSource.email}>`,
    ReplyToAddresses: [emailSource.email],
    ReturnPath: emailSource.email,
  };

  let sesResponseRaw;
  try {
    const response = await ses.sendEmail(data).promise();
    sesResponseRaw = JSON.stringify(response);
  } catch (err) {
    sesResponseRaw = err.toString();
  }

  await EmailSent.findOneAndUpdate({_id: emailSent._id}, {$set: {sesResponseRaw}});
}
