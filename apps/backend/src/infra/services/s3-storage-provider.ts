import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  StorageProvider,
  PresignedUrlRequest,
  PresignedUrlResponse,
} from '../../core/application/services/storage-provider.service';
import { randomUUID } from 'crypto';
import * as path from 'path';

const TEN_MB = 10 * 1024 * 1024;
const FIVE_MINUTES = 300;

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

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
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
    const expiresIn = FIVE_MINUTES;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn,
      signableHeaders: new Set(['content-length']),
      // Enforce max file size at S3 level - clients cannot bypass this
      unhoistableHeaders: new Set(['x-amz-content-sha256']),
    });

    const fileUrl = this.buildFileUrl(key);

    return {
      presignedUrl: this.replaceLocalhostForDev(presignedUrl),
      fileUrl: this.replaceLocalhostForDev(fileUrl),
      key,
      expiresIn,
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
