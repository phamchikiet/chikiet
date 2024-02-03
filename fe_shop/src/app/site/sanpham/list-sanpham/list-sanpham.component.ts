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
import { GiohangService } from 'fe_shop/src/app/admin/main-admin/website/giohang/giohang.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  _GiohangService: GiohangService = inject(GiohangService);
  ListSanpham:any={}
  FilterSanpham:any[]=[]
  SearchParams: any = {
    pageSize:50,
    pageNumber:0,
    Status:1
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
  constructor(private _bottomSheet: MatBottomSheet,private _snackBar: MatSnackBar) {}
  openBottomSheet(): void {
    this._bottomSheet.open(ListsanphamBottomsheetComponent);
  }
  async ngOnInit() {
    this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterSanpham = this.ListSanpham.items
    console.log(this.ListSanpham);
    
  }
  AddtoCart(data:any)
  {
    let item:any={}
    item = data
    item.Giachon = data.Giagoc[0]
    item.Soluong=1    
    this._GiohangService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 2000,
      });
    })
  }

}
