import { DecimalPipe } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
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
import { DanhmucService } from 'fe_shop/src/app/admin/main-admin/danhmuc/danhmuc.service';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-list-sanpham',
  standalone:true,
  imports:[
    RouterLink,
    DecimalPipe,
    MatButtonModule,
    MatBottomSheetModule,
    FormsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  templateUrl: './list-sanpham.component.html',
  styleUrls: ['./list-sanpham.component.css']
})
export class ListSanphamComponent implements OnInit {
  @HostListener('window:scroll')
  onScroll() {
    // const bodyHeight = document.body.scrollHeight;
    // const viewportHeight = window.innerHeight;
    // const offset = 80;    
    // if (window.scrollY > offset) {
    //   this.isSticky =true
    // } else {
    //   this.isSticky =false 
    // }
  }
  isSticky:boolean=false
  _SanphamService: SanphamService = inject(SanphamService);
  _GiohangService: GiohangService = inject(GiohangService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  ListSanpham:any={}
  FilterSanpham:any[]=[]
  ListDanhmuc:any={}
  FilterDanhmuc:any[]=[]
  SearchParams: any = {
    pageSize:9,
    pageNumber:0,
    Status:1
  };
  SearchParamsDanhmuc: any = {
    pageSize:50,
    pageNumber:0,
    Status:1
  };
  SortingFilter:any={}
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
  pageSizeOptions:any[]=[9]
  
  constructor(private _bottomSheet: MatBottomSheet,private _snackBar: MatSnackBar) {}
  openBottomSheet(): void {
    this._bottomSheet.open(ListsanphamBottomsheetComponent);
  }
  async ngOnInit() {
    this.SortingFilter = this.Sorting[0].id
    this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.ListDanhmuc = await this._DanhmucService.SearchDanhmuc(this.SearchParamsDanhmuc)
    this.FilterSanpham = this.ListSanpham.items
    this.FilterDanhmuc = this.ListDanhmuc.items.map((v:any)=>({...v,isChecked:false}))
   // this.pageSizeOptions = [10, 20, this.ListSanpham.totalCount].filter(v => v <= this.ListSanpham.totalCount);
    console.log(this.ListSanpham);
    console.log(this.FilterDanhmuc);
    
  }
  async onPageChange(event: any) {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterSanpham = this.ListSanpham.items
  }
  onFilterChange(event: MatCheckboxChange) {
    const checked = event.checked;
    const index = event.source;
    console.log(event);
    console.log(this.FilterDanhmuc.map((v)=>(v.isChecked)));
    
   // console.log(`Filter category ${index} changed to ${checked}`);

    // Example: Update the displayed data based on the checked filters
    // this.filteredData = this.originalData.filter(dataItem => {
    //     return this.FilterDanhmuc.some(filter => filter.isChecked && filter.CategoryId === dataItem.CategoryId);
    // });
}
  async onChangeSorting(event: any) {
    switch (Number(event.target.value)) {
      case 2:
        this.SearchParams.CreateAt = 'ASC'
        this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
        this.FilterSanpham = this.ListSanpham.items
        break;
      // case 3:
      //   this.SearchParams.CreateAt = 'ASC'
      //   this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
      //   this.FilterSanpham = this.ListSanpham.items
      //   break;
      default:
        this.SearchParams.CreateAt = 'DESC'
        this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
        this.FilterSanpham = this.ListSanpham.items
        break;
    }
  }

  async applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.SearchParams.Query=value
      this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
      this.FilterSanpham = this.ListSanpham.items
    }
    else {
      delete this.SearchParams.Query
      this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
      this.FilterSanpham = this.ListSanpham.items
    }
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
