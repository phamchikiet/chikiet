import { DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SanphamService } from 'fe_shop/src/app/admin/main-admin/sanpham/sanpham.service';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet'
import { ListsanphamBottomsheetComponent } from './listsanpham-bottomsheet/listsanpham-bottomsheet.component';

@Component({
  selector: 'app-list-sanpham',
  standalone:true,
  imports:[
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    MatBottomSheetModule
  ],
  templateUrl: './list-sanpham.component.html',
  styleUrls: ['./list-sanpham.component.css']
})
export class ListSanphamComponent implements OnInit {
  _SanphamService: SanphamService = inject(SanphamService);
  ListSanpham:any={}
  FilterSanpham:any[]=[]
  SearchParams: any = {
    pageSize:10,
    pageNumber:0
  };
  Sorting:any[]=[
    {id:1,Title:"Mới Nhất"},
    {id:2,Title:"Cũ Nhất"},
    {id:3,Title:"Thịnh Hành"},
    {id:4,Title:"Bán Chạy"},
    {id:5,Title:"Đánh Giá Cao"},
  ]
  LocDanhmuc:any[]=[
    {id:1,Title:"Đặc Sản Rau Rừng"},
    {id:2,Title:"Trái Cây Các Loại"},
    {id:3,Title:"Các Loại Nấm"},
  ]
  LocThuongHieu:any[]=[
    {id:1,Title:"Rau Sạch Trần Gia"},
  ]
  constructor(private _bottomSheet: MatBottomSheet) {}
  openBottomSheet(): void {
    this._bottomSheet.open(ListsanphamBottomsheetComponent);
  }
  async ngOnInit() {
    this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterSanpham = this.ListSanpham.items
    console.log(this.ListSanpham);
    
  }

}
