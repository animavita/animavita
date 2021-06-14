import aws, {S3} from 'aws-sdk';
import {encode} from 'node-base64-image';

import {AWS_S3_BUCKET_NAME} from '../../../config';
import StorageProvider, {SaveFileDTO} from '../models/StorageProvider';

export default class S3StorageProvider implements StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      ...(process.env.NODE_ENV !== 'production'
        ? {endpoint: 'http://localhost:4566', s3ForcePathStyle: true}
        : {region: 'us-east-1'}),
    });
  }

  public async saveFile({userId, imageURL}: SaveFileDTO): Promise<string> {
    const base64Image = await encode(imageURL);

    const buffer = base64Image;

    const {Key} = await this.client
      .upload({
        Bucket: AWS_S3_BUCKET_NAME!,
        Key: `profile-pictures/${userId}${new Date().getTime()}.jpeg`,
        ACL: 'public-read',
        Body: buffer,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
      })
      .promise();

    return Key;
  }
}
