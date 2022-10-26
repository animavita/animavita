import { Module } from '@nestjs/common';
import { AdoptionsModule } from './adoptions/adoptions.module';

@Module({
  imports: [AdoptionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
