import { Test, TestingModule } from '@nestjs/testing';
import { BansanphamController } from './bansanpham.controller';
import { BansanphamService } from './bansanpham.service';

describe('BansanphamController', () => {
  let controller: BansanphamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BansanphamController],
      providers: [BansanphamService],
    }).compile();

    controller = module.get<BansanphamController>(BansanphamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
