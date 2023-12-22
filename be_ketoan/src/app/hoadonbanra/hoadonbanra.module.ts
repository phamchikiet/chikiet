import { Module } from '@nestjs/common';
import { hoadonbanraService } from './hoadonbanra.service';
import { hoadonbanraController } from './hoadonbanra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { hoadonbanraEntity } from './entities/hoadonbanra.entity';
@Module({
  imports: [TypeOrmModule.forFeature([hoadonbanraEntity])],
  controllers: [hoadonbanraController],
  providers: [hoadonbanraService]
})
export class hoadonbanraModule {}
