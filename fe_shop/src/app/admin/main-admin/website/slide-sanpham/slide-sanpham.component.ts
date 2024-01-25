import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { GiohangService } from '../giohang/giohang.service';
import Swiper, { Pagination } from 'swiper';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-slide-sanpham',
  standalone:true,
  imports:[
    NgOptimizedImage,
    DecimalPipe,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slide-sanpham.component.html',
  styleUrls: ['./slide-sanpham.component.css']
})
export class SlideSanphamComponent implements OnInit {
  @Input() Title = '';
  @Input() Sohang=2;
  @Input() Socot=4;
  @Input() Soluong=8;
  _SanphamService:SanphamService = inject(SanphamService)
  _GiohangService: GiohangService = inject(GiohangService);
  Lists: any={}
  FilterLists: any[] = []
  FilterListsDesk: any[] = []
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  constructor() { }
  async ngOnInit() {
    this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang).slice(0,8)    
    // console.log(this.FilterListsDesk);
  }
  SanphamColumn(data:any,n:any)
  {
    const chunkSize = n; // Number of elements per subarray
    const newArray = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      newArray.push(data.slice(i, i + chunkSize));
    }
    return newArray
  }
  AddtoCart(data:any)
  {
    console.log(data); 
    let item:any={}
    item = data
    item.Giachon = data.Giagoc[0]
    item.Soluong=1    
    this._GiohangService.addToCart(item)
  }
  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },
      navigation:true,
      slidesPerView:1,
      spaceBetween: 20,
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      },
    });
  }
}
