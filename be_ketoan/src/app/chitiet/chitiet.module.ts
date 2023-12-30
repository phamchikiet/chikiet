import { Module } from '@nestjs/common';
import { ChitietService } from './chitiet.service';
import { ChitietController } from './chitiet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChitietEntity } from './entities/chitiet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ChitietEntity])],
  controllers: [ChitietController],
  providers: [ChitietService]
})
export class ChitietModule {}
