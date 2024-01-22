import { Test, TestingModule } from '@nestjs/testing';
import { DonhangService } from './donhang.service';

describe('DonhangService', () => {
  let service: DonhangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonhangService],
    }).compile();

    service = module.get<DonhangService>(DonhangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
