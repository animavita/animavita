import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  HttpStatus,
  HttpException,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  STORAGE_PROVIDER,
  StorageProvider,
  PresignedUrlRequest,
} from '../../core/application/services/storage-provider.service';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('api/v1/uploads')
export class UploadController {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProvider,
  ) {}

  @Get('presigned-url')
  @UseGuards(AccessTokenGuard)
  async getPresignedUrl(
    @Query('filename') filename?: string,
    @Query('contentType') contentType?: string,
  ) {
    return this.storageProvider.getPresignedUrl({ filename, contentType });
  }

  @Post('presigned-urls')
  @UseGuards(AccessTokenGuard)
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
