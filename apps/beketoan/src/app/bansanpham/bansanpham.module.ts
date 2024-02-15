import { Module } from '@nestjs/common';
import { BansanphamService } from './bansanpham.service';
import { BansanphamController } from './bansanpham.controller';

@Module({
  controllers: [BansanphamController],
  providers: [BansanphamService],
})
export class BansanphamModule {}
