import { Module } from '@nestjs/common';
import { MuasanphamService } from './muasanpham.service';
import { MuasanphamController } from './muasanpham.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuasanphamEntity } from './entities/muasanpham.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MuasanphamEntity])],
  controllers: [MuasanphamController],
  providers: [MuasanphamService]
})
export class MuasanphamModule {}
