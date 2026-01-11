import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common';
import {
  STORAGE_PROVIDER,
  StorageProvider,
  PresignedUrlRequest,
} from '../../core/application/services/storage-provider.service';

@Controller('uploads')
export class UploadController {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProvider,
  ) {}

  @Get('presigned-url')
  async getPresignedUrl(
    @Query('filename') filename?: string,
    @Query('contentType') contentType?: string,
  ) {
    return this.storageProvider.getPresignedUrl({ filename, contentType });
  }

  @Post('presigned-urls')
  async getPresignedUrls(@Body() body: { files: PresignedUrlRequest[] }) {
    if (!body.files || !Array.isArray(body.files) || body.files.length === 0) {
      throw new HttpException(
        'files array is required and cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    const maxFiles = 10;
    if (body.files.length > maxFiles) {
      throw new HttpException(
        `Maximum ${maxFiles} files allowed per request`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const uploads = await this.storageProvider.getPresignedUrls(body.files);
    return { uploads };
  }
}
