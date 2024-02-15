import { Module } from '@nestjs/common';
import { CauhinhService } from './cauhinh.service';
import { CauhinhController } from './cauhinh.controller';

@Module({
  controllers: [CauhinhController],
  providers: [CauhinhService],
})
export class CauhinhModule {}
