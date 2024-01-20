import { Module } from '@nestjs/common';
import { GiohangService } from './giohang.service';
import { GiohangController } from './giohang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiohangEntity } from './entities/giohang.entity';
import { GiohangsanphamEntity } from './entities/giohangsanpham.entity';
@Module({
  imports: [TypeOrmModule.forFeature([GiohangEntity,GiohangsanphamEntity])],
  controllers: [GiohangController],
  providers: [GiohangService]
})
export class GiohangModule {}
