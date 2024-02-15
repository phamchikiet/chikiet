import { Module } from '@nestjs/common';
import { XuatnhaptonService } from './xuatnhapton.service';
import { XuatnhaptonController } from './xuatnhapton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XuatnhaptonEntity } from './entities/xuatnhapton.entity';
@Module({
  imports: [TypeOrmModule.forFeature([XuatnhaptonEntity])],
  controllers: [XuatnhaptonController],
  providers: [XuatnhaptonService]
})
export class XuatnhaptonModule {}
