import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataServicesModule } from './data-services.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { PetModule } from './pet.module';
import { GeolocationModule } from './geolocation.module';

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
