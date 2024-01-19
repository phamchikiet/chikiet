import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

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
  Lists: any={}
  FilterLists: any[] = []
  FilterListsDesk: any[] = []
  SearchParams: any = {
    pageSize:10,
    pageNumber:0
  };
  constructor() { }
  async ngOnInit() {
    this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterLists = this.SanphamColumn(this.Lists.items,this.Sohang)
     console.log(this.FilterLists);
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
  
}
