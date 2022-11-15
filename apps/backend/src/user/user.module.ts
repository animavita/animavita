import { Module } from '@nestjs/common';
import { UserEntitiesModule } from './entities/user-entities.module';
import { UserService } from './user.service';

@Module({
  imports: [UserEntitiesModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
