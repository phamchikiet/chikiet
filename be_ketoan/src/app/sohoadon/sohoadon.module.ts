import { Module } from '@nestjs/common';
import { SohoadonService } from './sohoadon.service';
import { SohoadonController } from './sohoadon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SohoadonEntity } from './entities/sohoadon.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SohoadonEntity])],
  controllers: [SohoadonController],
  providers: [SohoadonService]
})
export class SohoadonModule {}
