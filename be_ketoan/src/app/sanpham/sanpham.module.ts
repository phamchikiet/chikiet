import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SanphamEntity } from './entities/sanpham.entity';
import { SanphamchungEntity } from './entities/sanphamchung.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SanphamEntity,SanphamchungEntity])],
  controllers: [SanphamController],
  providers: [SanphamService]
})
export class SanphamModule {}
