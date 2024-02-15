import { Module } from '@nestjs/common';
import { HoadonhhpService } from './hoadonhhp.service';
import { HoadonhhpController } from './hoadonhhp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoadonhhpEntity } from './entities/hoadonhhp.entity';
@Module({
  imports: [TypeOrmModule.forFeature([HoadonhhpEntity])],
  controllers: [HoadonhhpController],
  providers: [HoadonhhpService]
})
export class HoadonhhpModule {}
