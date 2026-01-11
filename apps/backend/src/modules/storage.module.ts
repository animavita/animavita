import { Module } from '@nestjs/common';
import { S3StorageProvider } from '../infra/services/s3-storage-provider';
import { UploadController } from '../infra/controllers/upload.controller';
import { STORAGE_PROVIDER } from '../core/application/services/storage-provider.service';

@Module({
  controllers: [UploadController],
  providers: [
    {
      provide: STORAGE_PROVIDER,
      useClass: S3StorageProvider,
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
