import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdoptionsModule } from './adoption/adoption.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DataServicesModule } from './infra/data-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DataServicesModule,
    AdoptionsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
