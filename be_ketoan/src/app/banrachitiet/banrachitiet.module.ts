import { Module } from '@nestjs/common';
import { BanrachitietService } from './banrachitiet.service';
import { BanrachitietController } from './banrachitiet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanrachitietEntity } from './entities/banrachitiet.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BanrachitietEntity])],
  controllers: [BanrachitietController],
  providers: [BanrachitietService]
})
export class BanrachitietModule {}
