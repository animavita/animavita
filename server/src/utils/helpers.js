import AWS from 'aws-sdk';

require('dotenv').config();

const {
  S3_KEY, S3_SECRET, S3_BUCKET, S3_REGION
} = process.env;

export const getAnimalGender = (gender) => {
  const genders = [
    {
      key: 'male',
      translate: 'Macho'
    },
    {
      key: 'female',
      translate: 'Fêmea'
    }
  ];

  return genders.find(element => element.key === gender).translate;
};

export const getAnimalSize = (size) => {
  const sizes = [
    {
      key: 'small',
      translate: 'Pequeno'
    },
    {
      key: 'medium',
      translate: 'Médio'
    },
    {
      key: 'bigger',
      translate: 'Grande'
    }
  ];

  return sizes.find(element => element.key === size).translate;
};

export const uploadFile = async (upload) => {
  let url = '';
  // eslint-disable-next-line new-cap
  const base64Data = new Buffer.from(
    upload.preview.uri.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const params = {
    Bucket: S3_BUCKET,
    Key: upload.image.name,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: upload.image.type
  };

  const s3 = new AWS.S3({
    accessKeyId: S3_KEY,
    secretAccessKey: S3_SECRET,
    region: S3_REGION
  });

  try {
    const { Location } = await s3.upload(params).promise();
    url = Location;
  } catch (err) {
    throw err;
  }

  return url;
};
