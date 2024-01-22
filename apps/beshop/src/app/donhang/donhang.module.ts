import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service';
import { DonhangController } from './donhang.controller';

@Module({
  controllers: [DonhangController],
  providers: [DonhangService]
})
export class DonhangModule {}
