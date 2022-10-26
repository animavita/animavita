import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';

describe('AdoptionsController', () => {
  let controller: AdoptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdoptionsController],
      providers: [AdoptionsService],
    }).compile();

    controller = module.get<AdoptionsController>(AdoptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
