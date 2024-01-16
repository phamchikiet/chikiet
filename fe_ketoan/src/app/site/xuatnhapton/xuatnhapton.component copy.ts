import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MuavaoService } from '../muavao/muavao.service';
import { NhomHanghoa } from '../../shared/shared.utils';
import { BanraService } from '../banra/banra.service';
import * as XLSX from 'xlsx';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CauhinhService } from '../cauhinh/cauhinh.service';
import * as moment from 'moment';
@Component({
  selector: 'app-xuatnhapton',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './xuatnhapton.component.html',
  styleUrls: ['./xuatnhapton.component.css']
})
export class XuatnhaptonComponent implements OnInit {
  
  _CauhinhService: CauhinhService = inject(CauhinhService);
  _BanraService: BanraService = inject(BanraService);
  List: any[] = []
  List1: any[] = []
  ListBanra: any[] = []
  ListMuavao: any[] = []
  Listfilter: any[] = []
  ListNhap: any[] = []
  ListXuat: any[] = []
  ListXNT: any[] = []
  thangluu: any = '03'
  namluu: any = '2023'
  displayedColumns: string[] = [
    'Ngay','tenn', 'shdonn', 'sluongn', 'dgian', 'thtienn', 'sluongx', 'dgiax', 'thtienx', 'Loaix',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Paginall:any=0
  constructor() {

  }

  async ngOnInit() {
 
  }
  async LoadXNT()
  {
    this.ListNhap = await this._CauhinhService.getListChitiet(this.thangluu,this.namluu,'NHAP');
    this.ListXuat = await this._CauhinhService.getListChitiet(this.thangluu,this.namluu,'XUAT');
    const data = [...this.ListNhap,...this.ListXuat];
    data.forEach((v)=>
    {
     v.Ngay = moment(v.Ngay).format("DD/MM/YYYY")
    })
    const groupedObjects = data.reduce((acc, obj) => {
     const group = acc.get(obj.Ngay) || [];
     group.push(obj);
     acc.set(obj.Ngay, group);
     return acc;
   }, new Map());
    const DataXNT = Array.from(groupedObjects.entries()).map(([Ngay, items]:any) => ({ Ngay, items }));
   //  this.ListXNT.sort((a:any, b:any) => new Date(a.Ngay) - new Date(b.Ngay))
    console.log(DataXNT);
    DataXNT.forEach((v)=>
    {
       const Xuat = v.items.filter((xuat:any)=>xuat.Loai=='XUAT')
       const Nhap = v.items.filter((nhap:any)=>nhap.Loai=='NHAP')
       const Max = [...Xuat,...Nhap]
       console.log(Max);
       
     // let Max = Xuat.length>Nhap.length?Xuat.length:Nhap.length
      // Max = Array.from({ length: Max }, (_, i) => i);
      // console.log(Max);
       Max.forEach((v:any,k:any) => {
         if(v.Loai=="NHAP")
         {
           const item = {
             Ngay:v.Ngay,
             tenn:v.ten,
             shdonn:v.shdon,
             sluongn:v.sluong,
             dgian:v.dgia,
             thtienn:v.thtien,
             sluongx:0,
             dgiax:0,
             thtienx:0,
             Loaix:v.Loai,
           } 
           
         this.ListXNT.push(item)
         }
         else
         {
           const item = {
             Ngay:v.Ngay,
             tenn:v.ten,
             shdonn:v.shdon,
             sluongn:0,
             dgian:0,
             thtienn:0,
             sluongx:v.sluong,
             dgiax:v.dgia,
             thtienx:v.thtien,
             Loaix:v.Loai,
           } 
         this.ListXNT.push(item)
         }
       });
    console.log(this.ListXNT);
    
       // console.log(v.Ngay,Xuat);
       // console.log(v.Ngay,Nhap);
       
    })
    this.dataSource = new MatTableDataSource(this.ListXNT);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Paginall = this.ListXNT.length;
  }
  LoadMuavao()
  {
    console.log(NhomHanghoa(this.ListMuavao));
    this.writeExcelFile(NhomHanghoa(this.ListMuavao))
  }
  LoadBanra()
  {
    this.writeExcelFile(NhomHanghoa(this.ListBanra))
    console.log(NhomHanghoa(this.ListBanra));
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
  FilterLoai(items:any,Loai:any)
  {   
 
    const result = items.filter((v:any)=>v.Loai==Loai)
    // console.log(Loai);
    // console.log(result);
    return result
  }
}
