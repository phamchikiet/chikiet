import { Module } from '@nestjs/common';
import { TonkhoService } from './tonkho.service';
import { TonkhoController } from './tonkho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TonkhoEntity } from './entities/tonkho.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TonkhoEntity])],
  controllers: [TonkhoController],
  providers: [TonkhoService]
})
export class TonkhoModule {}
