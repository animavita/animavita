import {SES} from 'aws-sdk';

interface SendEmailParams {
  userId: string;
  email: string;
  subject: string;
  htmlBody: string;
}

export async function sendEmail(params: SendEmailParams) {
  const {userId, email, subject, htmlBody} = params;

  if (!email) {
    // eslint-disable-next-line no-console
    console.log('User without email:', params);
    return;
  }

  const ses = new SES();

  return await ses
    .sendEmail({
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
      Source: 'animavitaapp@gmail.com',
      ReplyToAddresses: ['animavitaapp@gmail.com'],
      ReturnPath: 'animavitaapp@gmail.com',
    })
    .promise();
}
