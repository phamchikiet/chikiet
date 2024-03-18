import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet'
import { BaivietBottomsheetComponent } from '../baiviet-bottomsheet/baiviet-bottomsheet.component';
import { BaivietAdminService } from 'fe_shop/src/app/admin/main-admin/baiviet-admin/baiviet-admin.service';
import { DanhmucService } from 'fe_shop/src/app/admin/main-admin/danhmuc/danhmuc.service';
@Component({
  selector: 'app-baiviet-style1',
  standalone:true,
  imports:[
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    MatBottomSheetModule,
    DatePipe
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  _BaivietAdminService: BaivietAdminService = inject(BaivietAdminService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  ListBaiviet:any={}
  FilterBaiviet:any[]=[]
  FilterBaivietKhac:any[]=[]
  Danhmucs:any[]=[]
  SearchParams: any = {
    pageSize:12,
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
  type:any
  constructor(
    private _bottomSheet: MatBottomSheet,
    private route: ActivatedRoute) {
    this.type = this.route.snapshot.data['type'];
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BaivietBottomsheetComponent);
  }
  async ngOnInit() {
    if(this.type){this.SearchParams.Type=this.type}
    this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
    this.Danhmucs = await this._DanhmucService.getAllDanhmuc()    
    this.FilterBaiviet = this.ListBaiviet.items
    this.FilterBaivietKhac = this.ListBaiviet.items.splice(0,4)
  }
  async applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 1) {
      this.SearchParams.Query=value
      this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
      this.FilterBaiviet = this.ListBaiviet.items
    }
    else {
      delete this.SearchParams.Query
      this.ListBaiviet = await this._BaivietAdminService.SearchBaivietAdmin(this.SearchParams)
      this.FilterBaiviet = this.ListBaiviet.items
    }
  }
}
