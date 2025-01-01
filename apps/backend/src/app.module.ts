import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CaslModule } from 'nest-casl';

import { AdoptionsModule } from './adoption/adoption.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GeolocationModule } from './geolocation/geolocation.module';
import { DataServicesModule } from './infra/data-services.module';
import { Roles } from './frameworks/casl/app.roles';
import { UserHook } from './frameworks/casl/hooks/user.hook';
import { PetModule } from './modules/pet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CaslModule.forRoot({
      superuserRole: Roles.Admin,
      getUserHook: UserHook,
    }),
    DataServicesModule,
    PetModule,
    AdoptionsModule,
    UserModule,
    AuthModule,
    GeolocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
