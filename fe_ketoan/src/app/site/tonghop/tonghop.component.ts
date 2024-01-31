import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { NhapkhoService } from '../nhapkho/nhapkho.service';
import { SanphamService } from '../sanpham/sanpham.service';
import { TonkhoService } from '../tonkho/tonkho.service';
import { XuatkhoService } from '../xuatkho/xuatkho.service';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tonghop',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './tonghop.component.html',
  styleUrls: ['./tonghop.component.css']
})
export class TonghopComponent implements OnInit {

  constructor() { }
  _NhapkhoService: NhapkhoService = inject(NhapkhoService);
  _XuatkhoService: XuatkhoService = inject(XuatkhoService);
  _TonkhoService: TonkhoService = inject(TonkhoService);
  _SanphamService: SanphamService = inject(SanphamService);
  ListXuatnhapton: any
  ListNhapkho: any
  ListXuatkho: any
  ListTonkho: any
  ListSanpham: any[] = []
  ListSanphamChung: any[] = []
  Listfilter: any[] = []
  ListXNT: any
  displayedColumns: string[] = ['TenSP','SLDK','TongDK','SLN', 'TongNhap', 'SLX', 'TongXuat', 'Quydoi', 'LechSL', 'LechTong','Gia'];
  dataSource!: MatTableDataSource<any>;
  SearchParams: any = {
    Thang: 1,
    Nam: 2023,
    Type: "NHAP",
    pageSize: 9000,
    pageNumber: 0
  };
  pageSizeOptions: any[] = [5]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit() {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  GetGia(tong:any,sl:any)
  {
      if(sl>0)
      {
        return (tong/sl).toFixed(0)
      }
      else
      {
        return 0
      }
  }
  async Load() {

    this.ListNhapkho = await this._NhapkhoService.ListNhapkhos()
    this.ListXuatkho = await this._XuatkhoService.ListXuatkhos()
    this.ListSanpham = await this._SanphamService.getAllSanpham()
    this.ListTonkho  = await this._TonkhoService.ListTonkhos()
    console.log(this.ListTonkho);
    
    this.ListSanphamChung = await this._SanphamService.getAllSanphamChung()
    this.Listfilter = await Promise.all(
      this.ListSanphamChung.map(async (v) => {
        const FilterNam =this.ListTonkho.filter((v:any) => v.Nam=='2022')
        const matchingTonkho = FilterNam.filter((n:any) => n.TenSP === v.TenSP 
        ||n.TenSP === v.TenSPXuat 
        ||n.TenSP === v.TenSPNhap 
        ||n.TenSP === v.TenSP1
        ||n.TenSP === v.TenSP2
        ||n.TenSP === v.TenSP3
        ||n.TenSP === v.TenSP4
        );
        const SLDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
        const TongDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
        const matchingNhapkho = this.ListNhapkho.filter((n: any) => n.TenSP === v.TenSP 
        || n.TenSP === v.TenSPXuat 
        || n.TenSP === v.TenSPNhap 
        || n.TenSP === v.TenSP1 
        || n.TenSP === v.TenSP2
        || n.TenSP === v.TenSP3
        || n.TenSP === v.TenSP4
        );
        const SLN = matchingNhapkho ? matchingNhapkho.reduce((total: any, item: any) => total + Number(item.Soluong*v.Quydoi || 0), 0) : 0
        const TongNhap = matchingNhapkho ? matchingNhapkho.reduce((total: any, item: any) => total + Number(item.Tongtien || 0), 0) : 0
        const matchingXuatkho = this.ListXuatkho.filter((n: any) => n.TenSP === v.TenSP 
        || n.TenSP === v.TenSPXuat 
        || n.TenSP === v.TenSPNhap 
        || n.TenSP === v.TenSP1 
        || n.TenSP === v.TenSP2
        || n.TenSP === v.TenSP3
        || n.TenSP === v.TenSP4
        );
        const SLX = matchingXuatkho ? matchingXuatkho.reduce((total: any, item: any) => total + Number(item.Soluong || 0), 0) : 0
        const TongXuat = matchingXuatkho ? matchingXuatkho.reduce((total: any, item: any) => total + Number(item.Tongtien || 0), 0) : 0
        return {
          ...v,
          SLDK:SLDK,
          TongDK:TongDK,
          SLN: SLN,
          TongNhap: TongNhap,
          SLX: SLX,
          TongXuat: TongXuat,
          LechSL: SLDK+SLN - SLX,
          LechTong: TongDK+TongNhap - TongXuat,
          Gia:this.GetGia(TongNhap,SLN),
          //TongNhap: TongNhap,
          //SLX:SLX ,
          //TTVon:(SLX*(Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN*v.Quydoi)))||0).toFixed(0),
          //TongXuat: TongXuat,
          //SLT: SLDK + SLN*v.Quydoi - SLX,
          //TTTon:((SLDK + SLN*v.Quydoi - SLX)*((Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN*v.Quydoi))))||0).toFixed(0),
          //TongTon:TongDK + TongNhap - TongXuat,
          Quydoi:v.Quydoi
        };
      })
    );
    console.log(this.Listfilter);
    this.dataSource = new MatTableDataSource(this.Listfilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageSizeOptions = [10, 20, this.SearchParams.pageSize].filter(v => v <= this.SearchParams.pageSize);

  }
  Subtotal(items: any[], field: any) {
    if (items.length > 0) {
      const totalSum = items.reduce((total: any, item: any) => total + Number(item[field]), 0);
      return totalSum
    }
    else return 0
  }
}
