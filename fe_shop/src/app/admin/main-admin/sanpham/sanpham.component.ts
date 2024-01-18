import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SanphamService } from './sanpham.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-sanpham',
  standalone:true,
  imports:[
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    RouterLink,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  Detail: any = {};
  Lists: any[] = []
  FilterLists: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  _SanphamService:SanphamService = inject(SanphamService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.FilterLists = this.Lists = await this._SanphamService.getAllSanpham()
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.Lists = this.Lists.filter((v) => {
     return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
       }
      )
    }
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._SanphamService.CreateSanpham(this.Detail)
      }
    });
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(jsonData);
      jsonData.forEach((v:any,k:any) => {
        setTimeout(() => {
          // const item:any={}
          // item.Title = v.content_vi
          // item.id_cat = v.id
          // item.Slug = v.tenkhongdau
          // this._SanphamService.CreateDanhmuc(item)
          // const convertedDate = v.Ngay.replace(/_/g, "/")
          // v.Ngayformat = new Date(convertedDate)
          // this.AddChart(v)
          // console.log(v);
        }, 100*k);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      {id:'TeXqj8Q2', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      {id:'TeXqj8Q3', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
    ]);
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