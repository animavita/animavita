import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import {
  StorageProvider,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '../../core/application/services/storage-provider.service';
import { randomUUID } from 'crypto';
import * as path from 'path';

const TEN_MB = 10 * 1024 * 1024;
const FIVE_MINUTES_IN_SECONDS = 300;

@Injectable()
export class S3StorageProvider implements StorageProvider {
  private s3Client: S3Client;
  private bucketName: string;
  private region: string;
  private endpoint: string | undefined;
  private readonly MAX_FILE_SIZE = TEN_MB;

  constructor() {
    this.region = process.env.AWS_REGION || 'us-east-1';
    this.endpoint = process.env.AWS_ENDPOINT;
    this.bucketName = process.env.AWS_S3_BUCKET_NAME || 'animavita-uploads';

    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) {
      throw new Error(
        'AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set in environment variables',
      );
    }

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
      ...(this.endpoint && {
        endpoint: this.endpoint,
        forcePathStyle: true, // Required for LocalStack
      }),
    });
  }

  async getPresignedUrl(
    request?: PresignedUrlRequest,
  ): Promise<PresignedUrlResponse> {
    const { filename, contentType = 'image/*' } = request || {};
    const fileExtension = filename ? path.extname(filename) : '';
    const key = `uploads/${randomUUID()}${fileExtension}`;

    const { url, fields } = await createPresignedPost(this.s3Client, {
      Bucket: this.bucketName,
      Key: key,
      Expires: FIVE_MINUTES_IN_SECONDS,
      Conditions: [
        ['content-length-range', 0, this.MAX_FILE_SIZE], // Enforced by S3
        ['starts-with', '$Content-Type', contentType.replace('/*', '/')],
      ],
      Fields: {
        'Content-Type': contentType,
      },
    });

    const fileUrl = this.buildFileUrl(key);

    return {
      presignedUrl: this.replaceLocalhostForDev(url),
      fields,
      fileUrl: this.replaceLocalhostForDev(fileUrl),
      key,
      expiresIn: FIVE_MINUTES_IN_SECONDS,
      maxFileSize: this.MAX_FILE_SIZE,
    };
  }

  async getPresignedUrls(
    requests: PresignedUrlRequest[],
  ): Promise<PresignedUrlResponse[]> {
    return Promise.all(
      requests.map((request) => this.getPresignedUrl(request)),
    );
  }

  private buildFileUrl(key: string): string {
    if (this.endpoint) {
      return `${this.endpoint}/${this.bucketName}/${key}`;
    }

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
  }

  private replaceLocalhostForDev(url: string) {
    const urlObject = new URL(url);
    if (urlObject.hostname === 'localstack') {
      urlObject.hostname = 'localhost';
    }
    return urlObject.toString();
  }
}
