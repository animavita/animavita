import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataServicesModule } from './data-services.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { PetModule } from './pet.module';
import { GeolocationModule } from './geolocation.module';
import { StorageModule } from './storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataServicesModule,
    PetModule,
    UserModule,
    AuthModule,
    GeolocationModule,
    StorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
