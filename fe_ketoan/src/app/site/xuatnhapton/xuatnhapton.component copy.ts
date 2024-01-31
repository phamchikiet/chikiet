// import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { CommonModule } from '@angular/common';
// import * as XLSX from 'xlsx';
// import { MatButtonModule } from '@angular/material/button';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatSelectChange, MatSelectModule } from '@angular/material/select';
// import { XuatnhaptonService } from './xuatnhapton.service';
// import { NhapkhoService } from '../nhapkho/nhapkho.service';
// import { XuatkhoService } from '../xuatkho/xuatkho.service';
// import { SanphamService } from '../sanpham/sanpham.service';
// import { TonkhoService } from '../tonkho/tonkho.service';
// @Component({
//   selector: 'app-xuatnhapton',
//   standalone: true,
//   imports: [CommonModule, 
//     MatFormFieldModule, 
//     MatInputModule, 
//     MatTableModule, 
//     MatSortModule, 
//     MatPaginatorModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatDatepickerModule,
//     MatNativeDateModule,
//     MatButtonModule,
//     ReactiveFormsModule,
//     MatSelectModule,
//     FormsModule,
//   ],
//   templateUrl: './xuatnhapton.component.html',
//   styleUrls: ['./xuatnhapton.component.css']
// })
// export class XuatnhaptonComponent implements OnInit {
//   _XuatnhaptonService: XuatnhaptonService = inject(XuatnhaptonService);
//   _NhapkhoService: NhapkhoService = inject(NhapkhoService);
//   _XuatkhoService: XuatkhoService = inject(XuatkhoService);
//   _TonkhoService: TonkhoService = inject(TonkhoService);
//   _SanphamService: SanphamService = inject(SanphamService);
//   displayedColumns: string[] = ['TenSP','SLDK','TongDK','SLN','TongNhap','SLX','TTVon','TongXuat','Chenhlech','SLT','TTTon','TongTon'];
//   dataSource!: MatTableDataSource<any>;
//   ListXuatnhapton: any
//   ListNhapkho: any
//   ListXuatkho: any
//   ListTonkho: any
//   ListSanpham: any[]=[]
//   ListSanphamChung: any[]=[]
//   Listfilter:any[]=[]
//   ListXNT: any
//   isFilter:boolean=false
//   Chonngay: any = { Batdau: new Date('2023-01-01'), Ketthuc: new Date('2023-01-31') }
//   SearchParams: any = {
//     Thang:1,
//     Type:"NHAP",
//     pageSize:9000,
//     pageNumber:0
//   };
//   SearchParamsTonkho: any = {
//     Thang:12,
//     Nam:2022,
//     pageSize:1000,
//     pageNumber:0
//   };
//   pageSizeOptions:any[]=[5]
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   constructor() {}
//   async ngOnInit() {
//     // this.ListXuatnhapton  = await this._XuatnhaptonService.SearchXuatnhapton(this.SearchParams)
//     this.ListNhapkho  = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
//     this.ListXuatkho  = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
//     this.ListTonkho  = await this._TonkhoService.SearchTonkho(this.SearchParamsTonkho)
//     this.ListXNT = this.ListSanpham  = await this._SanphamService.getAllSanpham()  
//     this.ListSanphamChung  = await this._SanphamService.getAllSanphamChung()  
//     console.log(this.ListNhapkho);
//     console.log(this.ListXuatkho);
//     this.Listfilter = await Promise.all(
//       this.ListSanphamChung.map(async (v) => {
//         const matchingTonkho = this.ListTonkho.items.filter((n:any) => n.TenSP == v.TenSP ||n.TenSP == v.TenSPXuat ||n.TenSP == v.TenSPNhap ||n.TenSP == v.TenSP1||n.TenSP == v.TenSP2);
//         const SLDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
//         const TongDK = matchingTonkho ? matchingTonkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
//         const matchingNhapkho = this.ListNhapkho.items.filter((n:any) => n.TenSP == v.TenSP ||n.TenSP == v.TenSPXuat ||n.TenSP == v.TenSPNhap||n.TenSP == v.TenSP1||n.TenSP == v.TenSP2);
//         const SLN = matchingNhapkho ? matchingNhapkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
//         const TongNhap = matchingNhapkho ? matchingNhapkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
//         const matchingXuatkho = this.ListXuatkho.items.filter((n:any) => n.TenSP == v.TenSP ||n.TenSP == v.TenSPXuat ||n.TenSP == v.TenSPNhap||n.TenSP == v.TenSP1||n.TenSP == v.TenSP2);
//         const SLX= matchingXuatkho ? matchingXuatkho.reduce((total:any, item:any) => total + Number(item.Soluong||0), 0) : 0
//         const TongXuat= matchingXuatkho ? matchingXuatkho.reduce((total:any, item:any) => total + Number(item.Tongtien||0), 0) : 0
    
//         if(v.TenSP=='BEL Phô mai CBC 8M')
//         {
//           return { 
//             ...v, 
//             SLDK:SLDK+7000,
//             TongDK:TongDK,
//             SLN: SLN,
//             TongNhap: TongNhap,
//             SLX:SLX ,
//             TTVon:(SLX*(Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN)))||0).toFixed(0),
//             TongXuat: TongXuat,
//             SLT: SLDK + SLN - SLX,
//             TTTon:((SLDK + SLN - SLX)*((Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN))))||0).toFixed(0),
//             TongTon:TongDK + TongNhap - TongXuat,
//           };
//         }
//      if(v.TenSP=='PM vuông Belcube vị sữa 24C 125Gx15')
//        {
//         return { 
//           ...v, 
//           SLDK:SLDK,
//           TongDK:TongDK,
//           SLN: SLN*15,
//           TongNhap: TongNhap,
//           SLX:SLX ,
//           TTVon:(SLX*(Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN*15)))||0).toFixed(0),
//           TongXuat: TongXuat,
//           SLT: SLDK + SLN*15 - SLX,
//           TTTon:((SLDK + SLN*15 - SLX)*((Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN*15))))||0).toFixed(0),
//           TongTon:TongDK + TongNhap - TongXuat,
//         };
//        }

//         else
//         {
//           return { 
//             ...v, 
//             SLDK:SLDK,
//             TongDK:TongDK,
//             SLN: SLN,
//             TongNhap: TongNhap,
//             SLX:SLX ,
//             TTVon:(SLX*(Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN)))||0).toFixed(0),
//             TongXuat: TongXuat,
//             SLT: SLDK + SLN - SLX,
//             TTTon:((SLDK + SLN - SLX)*((Math.abs(Number(TongDK))+Math.abs(Number(TongNhap)))/(Math.abs(Number(SLDK))+Math.abs(Number(SLN))))||0).toFixed(0),
//             TongTon:TongDK + TongNhap - TongXuat,
//           };
//         }
        
//       })
//     );  
//     // console.log(this.Listfilter);
//     // this.Listfilter = this.Listfilter.filter((v) => {
//     //   return (v.SLT <0  ||  v.TTTon<0); 
//     // });
//     this.Listfilter.forEach((v:any) => {
//       v.Chenhlech = v.TongXuat -v.TTVon
//     });
//       this.dataSource = new MatTableDataSource(this.Listfilter);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//       this.pageSizeOptions = [10, 20, this.SearchParams.pageSize].filter(v => v <= this.SearchParams.pageSize);
//   }
//   Filter()
//   {
//     this.isFilter=!this.isFilter
//     let data
//     if(this.isFilter)
//     {
//       data = this.Listfilter.filter((v) => {
//         return (v.SLT <0 || v.TTTon<0); 
//       });
//     }
//     else
//     {
//       data = this.Listfilter
//     }

//       this.dataSource = new MatTableDataSource(data);
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//       this.pageSizeOptions = [10, 20, this.SearchParams.pageSize].filter(v => v <= this.SearchParams.pageSize);
//   }
//   writeExcelFile(data: any) {
//     const exportData = data.map((v:any)=>(
//       {
//         'Tên Hàng':v.TenSP,
//         'Số Lượng Đk':v.SLDK,
//         'Tổng Đk':v.TongDK,
//         'Số Lượng Nhập':v.SLN,
//         'Tổng Nhập':v.TongNhap,
//         'Số Lượng Xuất':v.SLX,
//         'Tổng Xuất':v.TongXuat,
//         'Tổng Vốn':v.TTVon,
//         'Số Lượng Tồn':v.SLT,
//         'Tổng Tồn':v.TTTon,
//       }
//     ))
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, 'data');
//   }
//   saveAsExcelFile(buffer: any, fileName: string) {
//     const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
//     const url: string = window.URL.createObjectURL(data);
//     const link: HTMLAnchorElement = document.createElement('a');
//     link.href = url;
//     link.download = `${fileName}.xlsx`;
//     link.click();
//     window.URL.revokeObjectURL(url);
//     link.remove();
//   }
//   async LoadXuatnhapton()
//   {

//   }
//   async onChangeThang(event: MatSelectChange) {
//     this.SearchParams.Thang = event.value
//     this.ListXuatnhapton = await this._XuatnhaptonService.SearchXuatnhapton(this.SearchParams)
//     console.log(this.ListXuatnhapton);

//     // this.dataSource = new MatTableDataSource(this.ListSP?.items);
//     // this.dataSource.paginator = this.paginator;
//     // this.dataSource.sort = this.sort;
//   }
//   Subtotal(items:any[],field:any)
//   {    
//     if(items.length>0)
//     {
//     const totalSum = items.reduce((total:any, item:any) => total + Number(item[field]), 0);
//     return totalSum
//     }
//     else return 0
//   }
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     if(filterValue.length> 2)
//     {
//     this.dataSource.filter = filterValue.trim().toLowerCase();    
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//     console.log(this.dataSource.filteredData);
//     }    
//   }
//   Update(data: any) {
//     data.forEach((v:any)=>
//     {

//     })
//     const exportData = data.map((v:any)=>(
//       {
//         'Tên Hàng':v.TenSP,
//         'Số Lượng Đk':v.SLDK,
//         'Tổng Đk':v.TongDK,
//         'Số Lượng Nhập':v.SLN,
//         'Tổng Nhập':v.TongNhap,
//         'Số Lượng Xuất':v.SLX,
//         'Tổng Vốn':v.TTVon,
//         'Số Lượng Tồn':v.SLT,
//         'Tổng Tồn':v.TTTon,
//       }
//     ))
//   }
//   AddNew(data: any) {
//     data.forEach((v:any,k:any)=>
//     {
//       setTimeout(() => {
//         const item:any={}
//         item.Thang = this.SearchParams.Thang
//         item.Nam = this.SearchParams.Nam
//         item.TenSP = v.TenSP
//         item.Soluong = v.SLT
//         item.Giavon = ((v.TTTon/v.SLT)||0).toFixed(0)
//         item.Tongtien = v.TTTon
//         this._TonkhoService.CreateTonkhos(item)
//       }, Math.random()*1000);
//     })
//   }
// }
