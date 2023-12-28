import { Component, OnInit, inject } from '@angular/core';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
  
  _MuavaoService: MuavaoService = inject(MuavaoService);
  _BanraService: BanraService = inject(BanraService);
  List: any[] = []
  List1: any[] = []
  ListBanra: any[] = []
  ListMuavao: any[] = []
  Listfilter: any[] = []
  constructor() {
    this._MuavaoService.getAllMuavaoChitiet()
    this._MuavaoService.muavaochitiets$.subscribe((data: any) => {
      let data2:any[] = []
      if (data) {
        this.List = data.data.map((v:any)=>(v.Dulieu))
        this.List.forEach((v: any) => {
          if (v.hdhhdvu.length > 0) {
            v.hdhhdvu = v.hdhhdvu.map((v1: any) => {
              const item = { ...v1, ...{ SHD: v.shdon },...{ Ngaytao: new Date(v.ntao) } }
              return item
            });
          }
          data2 = [...data2, ...v.hdhhdvu]
        });
       this.ListMuavao = data2.map((v: any) => ({ ten: v.ten, soluong: v.sluong,SHD: v.SHD,Ngaytao: v.Ngaytao, dgia: v.dgia, thanhtien: v.sluong * v.dgia, dvtinh: v.dvtinh, loai: "Nhap" }))
      }
    })
    this._BanraService.getBanrachitiets()
    this._BanraService.banrachitiets$.subscribe((data: any) => {
      let data2:any[] = []
      if (data) {
        this.List1 = data.map((v:any)=>(v.Dulieu))
        this.List1.forEach((v: any) => {
          if (v.hdhhdvu.length > 0) {
            v.hdhhdvu = v.hdhhdvu.map((v1: any) => {
              const item = { ...v1, ...{ SHD: v.shdon },...{ Ngaytao: new Date(v.ntao) } }
              return item
            });
          }
          data2 = [...data2, ...v.hdhhdvu]
        });
       this.ListBanra = data2.map((v: any) => ({ ten: v.ten, soluong: v.sluong,SHD: v.SHD,Ngaytao: v.Ngaytao, dgia: v.dgia, thanhtien: v.sluong * v.dgia, dvtinh: v.dvtinh, loai: "Xuat" }))
      }
    })
  }

  ngOnInit() {

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
}
