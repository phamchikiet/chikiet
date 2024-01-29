import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { NhapkhoService } from '../../nhapkho/nhapkho.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import { XuatkhoService } from '../../xuatkho/xuatkho.service';
import { XuatnhaptonService } from '../xuatnhapton.service';
import { TonkhoService } from '../../tonkho/tonkho.service';
@Component({
  selector: 'app-xnt',
  standalone: true,
  imports: [CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './xnt.component.html',
  styleUrls: ['./xnt.component.css']
})
export class XNTComponent implements OnInit {
  _XuatnhaptonService: XuatnhaptonService = inject(XuatnhaptonService);
  _NhapkhoService: NhapkhoService = inject(NhapkhoService);
  _XuatkhoService: XuatkhoService = inject(XuatkhoService);
  _TonkhoService: TonkhoService = inject(TonkhoService);
  _SanphamService: SanphamService = inject(SanphamService);
  displayedColumns: string[] = ['TenSP','SLDK','TongDK','SLN','TongNhap','SLX','TongXuat','SLT','TongTon'];
  dataSource!: MatTableDataSource<any>;
  ListXuatnhapton: any
  ListNhapkho: any
  ListXuatkho: any
  ListTonkho: any
  ListSanpham: any[]=[]
  ListSanphamChung: any[]=[]
  Listfilter:any[]=[]
  ListXNT: any
  Chonngay: any = { Batdau: new Date('2023-01-01'), Ketthuc: new Date('2023-01-31') }
  SearchParams: any = {
    Thang:1,
    Type:"NHAP",
    pageSize:1000,
    pageNumber:0
  };
  SearchParamsTonkho: any = {
    Thang:12,
    Nam:2022,
    pageSize:1000,
    pageNumber:0
  };
  pageSizeOptions:any[]=[5]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  async ngOnInit() {
    // this.ListXNT  = await this._XNTService.SearchXNT(this.SearchParams)
    this.ListNhapkho  = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
    this.ListXuatkho  = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
    this.ListTonkho  = await this._TonkhoService.SearchTonkho(this.SearchParamsTonkho)
    this.ListXNT = this.ListSanpham  = await this._SanphamService.getAllSanpham()  
    const ListSanphamChung  = await this._SanphamService.getAllSanphamChung()  
    console.log(this.ListNhapkho);
    console.log(this.ListXuatkho);
    this.Listfilter = await Promise.all(
      this.ListSanpham.map(async (v) => {
        const matchingHave = ListSanphamChung.find((n:any) => n.TenSP == v.TenSP ||n.TenSPXuat == v.TenSP ||n.TenSPNhap == v.TenSP);
        const matchingTonkho = this.ListTonkho.items.filter((n:any) => n.TenSP == v.TenSP ||n.TenSP == v.TenSPXuat ||n.TenSP == v.TenSPNhap);
        const SLDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
        const TongDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
        const matchingNhapkho = this.ListNhapkho.items.filter((n:any) => n.TenSP == v.TenSP ||n.TenSP == v.TenSPXuat ||n.TenSP == v.TenSPNhap);
        const SLN = matchingNhapkho ? matchingNhapkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
        const TongNhap = matchingNhapkho ? matchingNhapkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0       
        const matchingXuatkho = this.ListXuatkho.items.filter((n:any) => n.TenSP == v.TenSP ||n.TenSP == v.TenSPXuat ||n.TenSP == v.TenSPNhap);
        const SLX= matchingXuatkho ? matchingXuatkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
        const TongXuat= matchingXuatkho ? matchingXuatkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
        return { 
          ...v, 
          SLDK:SLDK,
          TongDK:TongDK,
          SLN: SLN,
          TongNhap: TongNhap,
          SLX: SLX,
          TongXuat: TongXuat,
          SLT: SLN - SLX,
          TongTon:TongNhap - TongXuat,
          isHave:matchingHave ? true : false
        };
      })
    );  
  console.log(this.Listfilter);
      this.dataSource = new MatTableDataSource(this.Listfilter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageSizeOptions = [10, 20, this.SearchParams.pageSize].filter(v => v <= this.SearchParams.pageSize);
  }
  ChangeDate() {

  }
  writeExcelFile(data: any) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'data');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
  async LoadXNT()
  {

  }
  async onChangeThang(event: MatSelectChange) {
    this.SearchParams.Thang = event.value
    this.ListXNT = await this._XuatnhaptonService.SearchXuatnhapton(this.SearchParams)
    console.log(this.ListXNT);

    // this.dataSource = new MatTableDataSource(this.ListSP?.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  Subtotal(items:any[],field:any)
  {
    if(items.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => total + item[field], 0);
    return totalSum
    }
    else return 0
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length> 2)
    {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(this.dataSource.filteredData);
    }    
  }
}
