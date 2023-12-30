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
import { Data } from './data';
import { CauhinhService } from '../cauhinh.service';
import { HDMV } from './hoadont1';
import { HDBR } from './hdbr';
@Component({
  selector: 'app-cauhinh-detail',
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
    FormsModule
  ],
  templateUrl: './cauhinh-detail.component.html',
  styleUrls: ['./cauhinh-detail.component.css']
})
export class CauhinhDetailComponent implements OnInit {
  displayedColumns: string[] = ['ten', 'shdon', 'sluong', 'dgia', 'thtien', 'Ngay', 'Loai'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  Chonngay: any = { Batdau: new Date('2022-01-01'), Ketthuc: new Date('2024-01-01') }
  ttxly: any = 5
  thangtim: any = '01'
  thangluu: any = '01'
  namtim: any = '2023'
  namluu: any = '2023'
  Data1: any = Data
  HDMV: any = HDMV
  HDBR: any = HDBR
  LoadData: any[] = []
  HoadonServer: any = 0
  ListSHD: any[] = []
  ListSHDChitiet: any[] = []
  ListHD: any[] = []
  ListChitiet: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _CauhinhService: CauhinhService = inject(CauhinhService);
  constructor() { }
  FindHoadon() {
    this.ListSHD.forEach((v: any, k: any) => {
      setTimeout(async () => {
        this._CauhinhService.FindHoadon(this.thangtim, this.thangluu, this.namtim, this.namluu, this.ttxly, v.SHDMV, 'NHAP')
      }, k * 100);
    });
  }
  FindChitiet() {
    this.HoadonServer.forEach((v: any, k: any) => {
      setTimeout(async () => {
        this._CauhinhService.FindChitietHoadon(v.nbmst, v.khhdon, v.shdon, v.Loai, this.thangluu, this.namluu)
      }, k * 100);
    });
  }
  FindBanra() {
    this.ListSHD.forEach((v: any, k: any) => {
      setTimeout(async () => {
        this._CauhinhService.FindBanra(this.thangtim, this.thangluu, this.namtim, this.namluu, v.SHDMV, 'XUAT')
      }, k * 100);
    });
  }
  FindCTBanra() {
    this.HoadonServer.forEach((v: any, k: any) => {
      setTimeout(async () => {
        this._CauhinhService.FindChitietBanra(v.nbmst, v.khhdon, v.shdon, v.Loai, this.thangluu, this.namluu)
      }, k * 100);
    });
  }
  async LoadHDChitiet(Loai:any) {
    this.ListChitiet = await this._CauhinhService.getListChitiet(this.thangluu, this.namluu,Loai)
    this.dataSource = new MatTableDataSource(this.ListChitiet);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  LoadTable() {

  }
  async LoadSoluong(Loai: any) {
    const data = await this._CauhinhService.getHoadon(this.thangluu, this.namluu, Loai)
    this.HoadonServer = data;
    this.HoadonServer.forEach((v: any) => { v.shdon = Number(v.shdon) })
    const data1Ids = new Set(this.HoadonServer.map((obj: any) => Number(obj.shdon)));
    console.log(this.HoadonServer);
    
    console.log(data1Ids);
    if (Loai == 'NHAP') {
      this.ListSHD = this.HDMV.filter((obj: any) => !data1Ids.has(obj.SHDMV));
      console.log(this.ListSHD);
    }
    else {
      this.ListSHD = this.HDBR.filter((obj: any) => !data1Ids.has(obj.SHDMV));
      console.log(this.ListSHD);
    }

  }
  async LoadSLCT() {
    this.ListChitiet = Array.from(
      new Set(this.ListChitiet.map(obj => Number(obj.shdon)))
    ).map(shdon => this.ListChitiet.find(obj => Number(obj.shdon) === Number(shdon)))

    //const dataIds = new Set(this.HDMV.map((obj:any) => obj.SHDMV));
    const data1Ids = new Set(this.ListChitiet.map((obj: any) => Number(obj.shdon)));
    console.log(data1Ids);

    this.HoadonServer = this.HoadonServer.filter((obj: any) => !data1Ids.has(obj.shdon));

    console.log(this.HoadonServer);

  }
  async LoadHoadon(Loai: any) {
    this.ListHD = await this._CauhinhService.getHoadon(this.thangluu, this.namluu, Loai)
  }
  ngOnInit() { }
  ChangeDate() {
    this.Listfilter = this.List.filter((v: any) => {
      const Ngaytao = new Date(v.tdlap)
      return Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
    })
    this.dataSource = new MatTableDataSource(this.Listfilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
  Subtotal(items: any[], field: any) {
    if (items.length > 0) {
      const totalSum = items.reduce((total: any, item: any) => total + item[field], 0);
      return totalSum
    }
    else return 0
  }
  FilterHoadon() {
    this.dataSource = new MatTableDataSource(this.Listfilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      console.log(this.dataSource.filteredData);
    }

  }
}

