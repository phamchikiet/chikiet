import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaivietModule } from './baiviet/baiviet.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { SanphamModule } from './sanpham/sanpham.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.221.221.14',
      port: 3306,
      username: 'jtnkwfpz_chikiet88',
      password: '@Hikiet1988',
      database: 'jtnkwfpz_shop',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
      charset: "utf8mb4",
    }), 
    DanhmucModule,
    SanphamModule,
    BaivietModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
