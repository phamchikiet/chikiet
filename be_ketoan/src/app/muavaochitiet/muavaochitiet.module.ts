import { Module } from '@nestjs/common';
import { MuavaochitietService } from './muavaochitiet.service';
import { MuavaochitietController } from './muavaochitiet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuavaochitietEntity } from './entities/muavaochitiet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([MuavaochitietEntity])],
  controllers: [MuavaochitietController],
  providers: [MuavaochitietService]
})
export class MuavaochitietModule {}
