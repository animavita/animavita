import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  Inject,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  STORAGE_PROVIDER,
  StorageProvider,
} from '../../core/application/services/storage-provider.service';
import { AccessTokenGuard } from '../../guards/accessToken.guard';
import { GetPresignedUrlQueryDto } from './dtos/get-presigned-url.dto';
import { GetPresignedUrlsDto } from './dtos/get-presigned-urls.dto';

@Controller('api/v1/uploads')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class UploadController {
  constructor(
    @Inject(STORAGE_PROVIDER)
    private readonly storageProvider: StorageProvider,
  ) {}

  @Get('presigned-url')
  @UseGuards(AccessTokenGuard)
  async getPresignedUrl(@Query() query: GetPresignedUrlQueryDto) {
    return this.storageProvider.getPresignedUrl({
      filename: query.filename,
      contentType: query.contentType,
    });
  }

  @Post('presigned-urls')
  @UseGuards(AccessTokenGuard)
  async getPresignedUrls(@Body() body: GetPresignedUrlsDto) {
    const uploads = await this.storageProvider.getPresignedUrls(body.files);
    return { uploads };
  }
}
