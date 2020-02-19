import mongoose, {Document, Model, Types} from 'mongoose';

const {ObjectId, Mixed} = mongoose.Schema.Types;

export const EMAILS = {
  EMAIL_WELCOME: 'USER:EMAIL_WELCOME',
};

export type EMAIL_TYPES = keyof typeof EMAILS;

const Schema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      description: 'User that received this e-mail',
      required: true,
    },
    emailAddress: {
      type: String,
      description: 'Email address this email was sent to',
      required: true,
    },
    emailSubject: {
      type: String,
      description: 'Subject written into this email',
      required: true,
    },
    emailHtml: {
      type: String,
      description: 'Html body of the email',
      required: true,
    },
    emailSenderName: {
      type: String,
      description: 'Name from which this email was sent',
      required: true,
    },
    emailSenderAddress: {
      type: String,
      description: 'E-mail from which this email was sent',
      required: true,
    },
    emailType: {
      type: String,
      required: true,
    },
    sesResponseRaw: {
      type: Mixed,
      description: 'Payload with data received from SES',
    },
  },
  {
    collection: 'EmailSent',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

Schema.index({user: 1, emailAddress: 1, emailType: 1});

export interface IEmailSent extends Document {
  user: Types.ObjectId;
  emailAddress: string;
  emailSubject: string;
  emailHtml: string;
  emailSenderName: string;
  emailSenderAddress: string;
  emailType: EMAIL_TYPES;
  createdAt: Date;
  updatedAt: Date;
}

const EmailSentModel: Model<IEmailSent> = mongoose.model('EmailSent', Schema);

export default EmailSentModel;
