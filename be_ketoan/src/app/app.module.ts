import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { hoadonbanraModule } from './hoadonbanra/hoadonbanra.module';
import { BanrachitietModule } from './banrachitiet/banrachitiet.module';
import { MuavaoModule } from './muavao/muavao.module';
import { MuavaochitietModule } from './muavaochitiet/muavaochitiet.module';
import { CauhinhModule } from './cauhinh/cauhinh.module';

@Module({
  imports: [    
  //   TypeOrmModule.forRoot({
  //   type: 'mysql',
  //   host: '103.221.221.14',
  //   port: 3306,
  //   username: 'jtnkwfpz_chikiet88',
  //   password: '@Hikiet1988',
  //   database: 'jtnkwfpz_ketoan',
  //   entities: [],
  //   autoLoadEntities: true,
  //   synchronize: true,
  //   charset: "utf8mb4",
  // }), 
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'ketoan',
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
    charset: "utf8mb4",
  }), 
  hoadonbanraModule, BanrachitietModule, MuavaoModule, MuavaochitietModule, CauhinhModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
