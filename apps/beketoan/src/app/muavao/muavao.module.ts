import { Module } from '@nestjs/common';
import { MuavaoService } from './muavao.service';
import { MuavaoController } from './muavao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuavaoEntity } from './entities/muavao.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MuavaoEntity])],
  controllers: [MuavaoController],
  providers: [MuavaoService]
})
export class MuavaoModule {}
