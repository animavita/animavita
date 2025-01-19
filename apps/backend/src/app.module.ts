import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { DataServicesModule } from './infra/data-services.module';
import { PetModule } from './modules/pet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataServicesModule,
    PetModule,
    UserModule,
    AuthModule,
    GeolocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
