import { Module } from '@nestjs/common';
import { OpencageController } from './opencage.controller';

@Module({
  controllers: [OpencageController],
})
export class OpencageModule {}
