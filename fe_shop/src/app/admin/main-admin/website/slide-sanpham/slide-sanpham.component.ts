import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject } from '@angular/core';
import { SanphamService } from '../../sanpham/sanpham.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-slide-sanpham',
  standalone:true,
  imports:[
    NgOptimizedImage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slide-sanpham.component.html',
  styleUrls: ['./slide-sanpham.component.css']
})
export class SlideSanphamComponent implements OnInit {
  @Input() Title = '';
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
    this.FilterLists = this.SanphamColumn(this.Lists.items,2)
    this.FilterListsDesk = this.Lists.items.slice(0, 8);
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
