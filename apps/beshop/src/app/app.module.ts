import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaivietModule } from './baiviet/baiviet.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { GiohangModule } from './giohang/giohang.module';
import { DonhangModule } from './donhang/donhang.module';
import { KhachhangModule } from './khachhang/khachhang.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { LienheModule } from './lienhe/lienhe.module';

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
     BaivietModule,
     GiohangModule,
     DonhangModule,
     KhachhangModule,
     UsersModule,
     UploadModule,
     LienheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}