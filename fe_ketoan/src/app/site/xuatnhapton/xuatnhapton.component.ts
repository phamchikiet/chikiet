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
import { XuatnhaptonService } from './xuatnhapton.service';
import { NhapkhoService } from '../nhapkho/nhapkho.service';
import { XuatkhoService } from '../xuatkho/xuatkho.service';
import { SanphamService } from '../sanpham/sanpham.service';
import { TonkhoService } from '../tonkho/tonkho.service';
import { groupByfield } from '../../shared/shared.utils';
import * as moment from 'moment';
@Component({
  selector: 'app-xuatnhapton',
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
  templateUrl: './xuatnhapton.component.html',
  styleUrls: ['./xuatnhapton.component.css']
})
export class XuatnhaptonComponent implements OnInit {
  _XuatnhaptonService: XuatnhaptonService = inject(XuatnhaptonService);
  _NhapkhoService: NhapkhoService = inject(NhapkhoService);
  _XuatkhoService: XuatkhoService = inject(XuatkhoService);
  _TonkhoService: TonkhoService = inject(TonkhoService);
  _SanphamService: SanphamService = inject(SanphamService);
  displayedColumns: string[] = ['TenSP','SLDK','TongDK','SLN','TongNhap','SLX','TTVon','TongXuat','Quydoi','Chenhlech','SLT','TTTon','TongTon'];
  dataSource!: MatTableDataSource<any>;
  ListXuatnhapton: any
  ListNhapkho: any
  ListXuatkho: any
  ListTonkho: any
  ListSanpham: any[]=[]
  ListSanphamChung: any[]=[]
  Listfilter:any[]=[]
  ListXNT: any
  isFilter:boolean=false
  Chonngay: any = { Batdau: new Date('2023-01-01'), Ketthuc: new Date('2023-01-31') }
  SearchParams: any = {
    Thang:1,
    Nam:2023,
    Type:"NHAP",
    pageSize:9000,
    pageNumber:0
  };
  SearchParamsTonkho: any = {
    Thang:12,
    Nam:2022,
    pageSize:1000,
    pageNumber:0
  };
  pageSizeOptions:any[]=[5]
  XNTData:any[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  async ngOnInit() {
  }
  GetXuat()
  {
    
  }
  Filter()
  {
    this.isFilter=!this.isFilter
    let data
    if(this.isFilter)
    {
      data = this.Listfilter.filter((v) => {
        return (v.SLT <0 || v.TTTon<0); 
      });
    }
    else
    {
      data = this.Listfilter
    }

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageSizeOptions = [10, 20, this.SearchParams.pageSize].filter(v => v <= this.SearchParams.pageSize);
  }
  Trituyetdoi(item:any)
  {
    return Math.abs(item)
  }
  async LoadXNT()
  {
      this.ListNhapkho  = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
      this.ListXuatkho  = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
      this.ListTonkho  = await this._TonkhoService.SearchTonkho(this.SearchParamsTonkho)
      this.ListXNT = this.ListSanpham  = await this._SanphamService.getAllSanpham()  
      this.ListSanphamChung  = await this._SanphamService.getAllSanphamChung()  
      this.Listfilter = await Promise.all(
        this.ListSanphamChung.map(async (v) => {
          const matchingTonkho = this.ListTonkho.items.filter((n:any) => 
          n.TenSP === v.TenSP 
          ||n.TenSP === v.TenSPXuat 
          ||n.TenSP === v.TenSPNhap 
          ||n.TenSP === v.TenSP1
          ||n.TenSP === v.TenSP2
          ||n.TenSP === v.TenSP3
          ||n.TenSP === v.TenSP4
          );
          const SLDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
          const TongDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
          const matchingNhapkho = this.ListNhapkho.items.filter((n:any) => 
            n.TenSP === v.TenSP 
          ||n.TenSP === v.TenSPXuat 
          ||n.TenSP === v.TenSPNhap
          ||n.TenSP === v.TenSP1
          ||n.TenSP === v.TenSP2
          ||n.TenSP === v.TenSP3
          ||n.TenSP === v.TenSP4
          );
          const SLN = matchingNhapkho ? matchingNhapkho.reduce((total:any, item:any) => total + Number(item.Soluong*v.Quydoi||0), 0) : 0
          const TongNhap = matchingNhapkho ? matchingNhapkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
          const matchingXuatkho = this.ListXuatkho.items.filter((n:any) => 
            n.TenSP === v.TenSP 
          ||n.TenSP === v.TenSPXuat 
          ||n.TenSP === v.TenSPNhap
          ||n.TenSP === v.TenSP1
          ||n.TenSP === v.TenSP2
          ||n.TenSP === v.TenSP3
          ||n.TenSP === v.TenSP4
          );
          const SLX= matchingXuatkho ? matchingXuatkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
          const TongXuat= matchingXuatkho ? matchingXuatkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0          
          console.log();
          
          return { 
              ...v, 
              SLDK:SLDK,
              TongDK:TongDK,
              SLN: SLN,
              TongNhap: TongNhap,
              SLX:SLX ,
              TTVon:(SLX*(Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN)))||0).toFixed(0),
              //TTVon:SLX*matchingNhapkho[0].Giavon,
              TongXuat: TongXuat,
              SLT: SLDK + SLN - SLX,
              TTTon:((SLDK + SLN - SLX)*((Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN))))||0).toFixed(0),
              TongTon:TongDK + TongNhap - TongXuat,
              Quydoi:v.Quydoi,
              Thang:this.SearchParams.Thang
            };     
        })
      );  
      this.Listfilter.forEach((v:any) => {
        v.Chenhlech = v.TongXuat - v.TTVon
      });
      this.XNTData=[...this.XNTData,...this.Listfilter]
        this.dataSource = new MatTableDataSource(this.Listfilter);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pageSizeOptions = [10, 20, this.SearchParams.pageSize].filter(v => v <= this.SearchParams.pageSize);
  
  }
  // writeExcelFile() {
  //   let Giagoc:any=[]
  //   let item:any={}
  //   this.FilterLists.forEach((v:any) => {  
  //       item.idSP =v.id
  //       item.TenSP =v.Title
  //       v.Giagoc.forEach((gg:any) => {
  //         item = {...item,...gg}
  //         Giagoc.push(item)
  //       });
  //   });    
  //   const workbook = XLSX.utils.book_new();
  //   const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
  //   const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
  //   XLSX.utils.book_append_sheet(workbook, worksheet1, 'DonhangAdmin');
  //   XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, 'DonhangAdmin_'+moment().format("DD_MM_YYYY"));
  // }
  writeExcelFile(data: any) {   
    console.log(groupByfield(this.XNTData));
    
    // const exportData = this.XNTData.map((v:any)=>(
    //   {
    //     'Tên Hàng':v.TenSP,
    //     'Tháng':v.Thang,
    //     'Số Lượng Đk':v.SLDK,
    //     'Tổng Đk':v.TongDK,
    //     'Số Lượng Nhập':v.SLN,
    //     'Tổng Nhập':v.TongNhap,
    //     'Số Lượng Xuất':v.SLX,
    //     'Tổng Xuất':v.TongXuat,
    //     'Tổng Vốn':v.TTVon,
    //     'Số Lượng Tồn':v.SLT,
    //     'Tổng Tồn':v.TTTon,
    //   }
    // ))

    const workbook = XLSX.utils.book_new();
    groupByfield(this.XNTData).forEach((v:any)=>
    {
      const exportData = v.children.map((v:any)=>(
        {
          'Tên Hàng':v.TenSP,
          'Tháng':v.Thang,
          'Số Lượng Đk':v.SLDK,
          'Tổng Đk':v.TongDK,
          'Số Lượng Nhập':v.SLN,
          'Tổng Nhập':v.TongNhap,
          'Số Lượng Xuất':v.SLX,
          'Tổng Xuất':v.TongXuat,
          'Tổng Vốn':v.TTVon,
          'Số Lượng Tồn':v.SLT,
          'Tổng Tồn':v.TTTon,
        }
      ))
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    //  const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(v.Nhom);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Thang '+v.Nhom);
     // XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
  
    })
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'XNT_'+moment().format("DD_MM_YYYY"));


    // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    // const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // this.saveAsExcelFile(excelBuffer, 'data');
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
  async LoadXuatnhapton()
  {

  }
  async onChangeThang(event: MatSelectChange) {
    this.SearchParams.Thang = event.value
    this.ListXuatnhapton = await this._XuatnhaptonService.SearchXuatnhapton(this.SearchParams)
    console.log(this.ListXuatnhapton);

    // this.dataSource = new MatTableDataSource(this.ListSP?.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  Subtotal(items:any[],field:any)
  {    
    if(items.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => total + Number(item[field]), 0);
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
  Update(data: any) {
    data.forEach((v:any)=>
    {

    })
    const exportData = data.map((v:any)=>(
      {
        'Tên Hàng':v.TenSP,
        'Số Lượng Đk':v.SLDK,
        'Tổng Đk':v.TongDK,
        'Số Lượng Nhập':v.SLN,
        'Tổng Nhập':v.TongNhap,
        'Số Lượng Xuất':v.SLX,
        'Tổng Vốn':v.TTVon,
        'Số Lượng Tồn':v.SLT,
        'Tổng Tồn':v.TTTon,
      }
    ))
  }
  AddNew(data: any) {
    data.forEach((v:any,k:any)=>
    {
      setTimeout(() => {
        const item:any={}
        item.Thang = this.SearchParams.Thang
        item.Nam = this.SearchParams.Nam
        item.TenSP = v.TenSP
        item.Soluong = v.SLT
        item.Giavon = ((v.TTTon/v.SLT)||0).toFixed(0)
        item.Tongtien = v.TTTon
        this._TonkhoService.CreateTonkhos(item)
      }, Math.random()*1000);
    })
  }
}
