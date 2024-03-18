import { DecimalPipe } from '@angular/common';
import { Component, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SanphamService } from 'fe_shop/src/app/admin/main-admin/sanpham/sanpham.service';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet'
import { GiohangService } from 'fe_shop/src/app/admin/main-admin/website/giohang/giohang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DanhmucService } from 'fe_shop/src/app/admin/main-admin/danhmuc/danhmuc.service';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { SanphamblockComponent } from 'fe_shop/src/app/sanpham/sanphamblock/sanphamblock.component';
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
    MatSelectModule,
    MatChipsModule,
    SanphamblockComponent
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
  ChosenFilterDM:any[]=[]
  SearchParams: any = {
    pageSize:999,
    pageNumber:0,
    Status:1
  };
  SearchParamsDanhmuc: any = {
    pageSize:999,
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
  openBottomSheet(TemplateRef:TemplateRef<any>): void {
    this._bottomSheet.open(TemplateRef)
    //this._bottomSheet.open(ListsanphamBottomsheetComponent);
  }
  route: ActivatedRoute = inject(ActivatedRoute);
  async ngOnInit() {
    this.SortingFilter = this.Sorting[0].id
    this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.ListDanhmuc = await this._DanhmucService.SearchDanhmuc(this.SearchParamsDanhmuc)
    this.FilterSanpham = this.ListSanpham.items
    this.FilterDanhmuc = this.ListDanhmuc.items.map((v:any)=>({...v,isChecked:false}))
   // this.pageSizeOptions = [10, 20, this.ListSanpham.totalCount].filter(v => v <= this.ListSanpham.totalCount);
    console.log(this.FilterSanpham.map((v)=>({Title:v.Title,Danhmuc:v.DMOrdering})).slice(0,8));
    this.FilterSanpham.sort((a:any,b:any)=> Number(a.DMOrdering) - Number(b.DMOrdering))
    const Slug = this.route.snapshot.params['slug'];
    if(Slug)
    {
      const item = this.FilterDanhmuc.find((v)=>v.Slug==Slug)
      item.isChecked = true
      this.FilterDanhmuc = this.FilterDanhmuc.map(element =>
          element.Slug === item.Slug ? item : element
        );
        this.onFilterChange()
    }

  }
  async onPageChange(event: any) {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterSanpham = this.ListSanpham.items
  }
  async onFilterChange() {
    this.ChosenFilterDM = this.FilterDanhmuc.filter((v)=>(v.isChecked==true))
    this.SearchParams.Danhmuc=this.ChosenFilterDM.map((v)=>(v.id_cat))
    if(this.SearchParams.Danhmuc.length>0)
    {
      this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
      this.FilterSanpham = this.ListSanpham.items
      console.log(this.FilterSanpham);
      
    }
    else
    {
        delete this.SearchParams.Danhmuc
        this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
        this.FilterSanpham = this.ListSanpham.items
        console.log(this.FilterSanpham);
    }
}
RemoveFilter(item:any)
{

}
  async onChangeSorting(event: any) {
    switch (Number(event.target.value)) {
      case 2:
        // this.SearchParams.CreateAt = 'ASC'
        // this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
        // this.FilterSanpham = this.ListSanpham.items
        this.FilterSanpham.sort((a:any,b:any)=> new Date(a.CreateAt).getTime() - new Date(b.CreateAt).getTime())
       
        break;
      // case 3:
      //   this.SearchParams.CreateAt = 'ASC'
      //   this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
      //   this.FilterSanpham = this.ListSanpham.items
      //   break;
      default:
        // this.SearchParams.CreateAt = 'DESC'
        // this.ListSanpham = await this._SanphamService.SearchSanpham(this.SearchParams)
        // this.FilterSanpham = this.ListSanpham.items
        this.FilterSanpham.sort((a:any,b:any)=> new Date(b.CreateAt).getTime() - new Date(a.CreateAt).getTime())
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
    item.Giachon.SLTT= data.Giagoc[0].khoiluong
    item.Soluong=1    
    this._GiohangService.addToCart(item).then(()=>
    {
      this._snackBar.open('Thêm Vào Giỏ Hàng Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }

}
