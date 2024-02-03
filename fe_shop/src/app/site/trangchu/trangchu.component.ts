import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, ViewChild, inject } from '@angular/core';
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
import Swiper, { Pagination } from 'swiper';
import { SanphamService } from '../../admin/main-admin/sanpham/sanpham.service';
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
    MatButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {
  drawerMode:any
  isMobile:boolean=false
  ListsSanpham: any=[]
  SearchParams: any = {
    pageSize:50,
    pageNumber:0,
    Status:1
  };
  _SanphamService:SanphamService = inject(SanphamService)
  constructor(
    private _breakpointObserver:BreakpointObserver,
  ) { }

  async ngOnInit() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches ? true : false;
    });
    const result = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.ListsSanpham = result.items.slice(0,12) 
  
  }

  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      slidesPerView:2,
      spaceBetween: 20,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      },
    });
  }
}
