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
import { MatPaginatorModule } from '@angular/material/paginator';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SanphamChitietComponent } from './sanpham-chitiet/sanpham-chitiet.component';
import * as moment from 'moment';
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
    MatButtonModule,
    MatPaginatorModule,
    ButtonModule,
    DynamicDialogModule
  ],
  providers: [DialogService],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  Detail: any = {};
  Lists: any={}
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize:10,
    pageNumber:0
  };
  sidebarVisible: boolean = false;
  _SanphamService:SanphamService = inject(SanphamService)
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private dialog: MatDialog,
    public dialogService: DialogService
  ) {
  }
  async ngOnInit(): Promise<void> {
    this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
    this.FilterLists = this.Lists.items
    this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
     console.log(this.FilterLists);
  }
  ref: DynamicDialogRef | undefined;
  show(sanpham:any) {
      this.ref = this.dialogService.open(SanphamChitietComponent, { 
        header: sanpham.Title,
        data: {
          Sanpham:sanpham
        },
      });
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.FilterLists = this.Lists.items.filter((v:any) => {
     return  v.Title.toLowerCase().includes(value)||v.Mota.toLowerCase().includes(value)
       })
    }
    else {this.FilterLists = this.Lists.items}
  }
  async onPageChange(event:any)
  {
    console.log(event);
    this.SearchParams.pageSize=event.pageSize
     this.SearchParams.pageNumber=event.pageIndex
     this.Lists = await this._SanphamService.SearchSanpham(this.SearchParams)
     this.FilterLists = this.Lists.items
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
      jsonData.forEach((v:any)=>
      {
        v.Giagoc = JSON.parse(v.Giagoc)
      })
      console.log(jsonData);
      // jsonData.forEach((v:any,k:any) => {
      //   setTimeout(() => {
      //     const item:any={}
      //     const Image:any = {Main:v.photo,Thumb:v.thumb}
      //     item.Title = v.name_vi
      //     item.id_cat = v.id_cat
      //     item.Mota = v.mota_vi
      //     item.Noidung = v.content_vi
      //     item.Slug = v.tenkhongdau
      //     item.SKU = v.ma
      //     item.Giagoc = v.gia
      //     item.Giaban = v.giakm
      //     item.Ordering = v.stt
      //     item.Status = v.hienthi
      //     item.View = v.luotxem
      //     item.Image = Image
      //     item.Noibat = v.noibat
      //     item.Banchay = v.banchay
      //     item.Moi = v.Moi
      //      this._SanphamService.CreateSanpham(item)
      //   }, 100*k);
      // });
    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    const Giagoc:any=[]
    this.FilterLists.forEach((v:any) => {
      Giagoc.puh = JSON.stringify(v.Giagoc)
    });
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    // const workbook1: XLSX.WorkBook = { Sheets: { 'Sanpham': worksheet1 }, SheetNames: ['Sheet1'] };
    // const workbook2: XLSX.WorkBook = { Sheets: { 'Giagoc': worksheet1 }, SheetNames: ['Sheet1'] };
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Sanpham');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Sanpham_'+moment().format("DD_MM_YYYY"));
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