import { Module } from '@nestjs/common';
import { NhapkhoService } from './nhapkho.service';
import { NhapkhoController } from './nhapkho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NhapkhoEntity } from './entities/nhapkho.entity';
@Module({
  imports: [TypeOrmModule.forFeature([NhapkhoEntity])],
  controllers: [NhapkhoController],
  providers: [NhapkhoService]
})
export class NhapkhoModule {}
