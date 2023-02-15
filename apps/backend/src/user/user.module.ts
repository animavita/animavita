import { Module } from '@nestjs/common';
import { UserEntitiesModule } from './repositories/user-repository.module';
import { UserService } from './user.service';

@Module({
  imports: [UserEntitiesModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
