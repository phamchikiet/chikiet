import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BannerComponent } from '../../admin/main-admin/website/banner/banner.component';
import { SwiperContainer } from 'swiper/element';
import { AboutusComponent } from '../../admin/main-admin/website/aboutus/aboutus.component';
import { SanphamnoibatComponent } from '../../admin/main-admin/website/sanphamnoibat/sanphamnoibat.component';
import { DanhgiaComponent } from '../../admin/main-admin/website/danhgia/danhgia.component';
import { PromoComponent } from '../../admin/main-admin/website/promo/promo.component';
import { DownloadappComponent } from '../../admin/main-admin/website/downloadapp/downloadapp.component';
import { SlideSanphamComponent } from '../../admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SwiperOptions } from 'swiper/types';
@Component({
  selector: 'app-trangchu',
  standalone:true,
  imports:[BannerComponent,
    AboutusComponent,
    SanphamnoibatComponent,
    DanhgiaComponent,
    PromoComponent,
    DownloadappComponent,
    SlideSanphamComponent,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {
  drawerMode:any
  isMobile:boolean=false
  @ViewChild('swiperSanpham', { static: false }) swiperSanpham: SwiperContainer | undefined;
  constructor(
    private _breakpointObserver:BreakpointObserver
  ) { }

  ngOnInit() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches ? true : false;
    });
   
  }
  // NextSanpham()
  // {
  //   console.log( this.swiperSanpham?.elemen);
  // }
}
