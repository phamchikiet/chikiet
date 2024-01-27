import { Test, TestingModule } from '@nestjs/testing';
import { BansanphamService } from './bansanpham.service';

describe('BansanphamService', () => {
  let service: BansanphamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BansanphamService],
    }).compile();

    service = module.get<BansanphamService>(BansanphamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
