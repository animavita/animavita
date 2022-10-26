import { Test, TestingModule } from '@nestjs/testing';
import { AdoptionsService } from './adoptions.service';

describe('AdoptionsService', () => {
  let service: AdoptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdoptionsService],
    }).compile();

    service = module.get<AdoptionsService>(AdoptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
