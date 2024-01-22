import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { GiohangService } from '../giohang/giohang.service';

@Component({
  selector: 'app-slide-sanpham',
  standalone:true,
  imports:[
    NgOptimizedImage,
    DecimalPipe
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
    this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang)
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
    let item:any={}
    item = data
    item.Total=data.Giagoc
    item.Soluong=1    
    this._GiohangService.addToCart(item)
  }
  
}
