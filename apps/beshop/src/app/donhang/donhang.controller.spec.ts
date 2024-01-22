import { Test, TestingModule } from '@nestjs/testing';
import { DonhangController } from './donhang.controller';
import { DonhangService } from './donhang.service';

describe('DonhangController', () => {
  let controller: DonhangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonhangController],
      providers: [DonhangService],
    }).compile();

    controller = module.get<DonhangController>(DonhangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
