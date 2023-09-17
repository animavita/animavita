import { Global, Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../frameworks/data-services/mongo-data-services.module';

@Global()
@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
