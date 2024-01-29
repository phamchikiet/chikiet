import { Module } from '@nestjs/common';
import { XuatkhoService } from './xuatkho.service';
import { XuatkhoController } from './xuatkho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XuatkhoEntity } from './entities/xuatkho.entity';
@Module({
  imports: [TypeOrmModule.forFeature([XuatkhoEntity])],
  controllers: [XuatkhoController],
  providers: [XuatkhoService]
})
export class XuatkhoModule {}
