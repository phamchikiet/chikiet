import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CauhinhService } from '../cauhinh/cauhinh.service';
import { ShdhhpService } from './shdhhp.service';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';
import { JsonPipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import * as moment from 'moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-shdhhp',
  standalone: true,
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    JsonPipe
  ],
  templateUrl: './shdhhp.component.html',
  styleUrls: ['./shdhhp.component.css']
})
export class ShdhhpComponent implements OnInit {
  SearchParams: any = {
    // Batdau:moment("2023-01-01").startOf('day').toDate(),
    // Ketthuc: moment("2023-01-31").endOf('day').toDate(),
    Thang: 1,
    Type: "XUAT",
    pageSize: 1000,
    pageNumber: 0
  };
  ListHD: any = []
  ListSP: any = {}
  constructor() { }
  _ShdhhpService: ShdhhpService = inject(ShdhhpService);
  displayedColumns: string[] = ['SHD', 'Thang', 'Nam', 'Type'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  async onPageChange(event: any) {
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.ListSP = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    this.dataSource = new MatTableDataSource(this.ListSP?.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  async onChangeLoai(event: MatSelectChange) {
    this.SearchParams.Type = event.value
    this.ListSP = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    this.dataSource = new MatTableDataSource(this.ListSP?.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  async ngOnInit() {
    const Drive = await this._ShdhhpService.getDrive()
    console.log(Drive);

    this.ListSP = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    this.dataSource = new MatTableDataSource(this.ListSP?.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.ListSP);
  }
  async LoadDrive() {
    const data = await this._ShdhhpService.getDrive();
    this.ListHD = data.values.slice(1).map((row: any) => {
      return {
        SHD: row[0],
        Thang: row[1],
        Nam: row[2],
        Type: row[3],
      };
    });
    this.ListHD = this.ListHD.filter((v:any)=>v.Type==this.SearchParams.Type)
    console.log(this.ListHD);
  }
  async SyncDrive() {
    this.ListHD.forEach((v: any, k: any) => {
      setTimeout(() => {
        this._ShdhhpService.CreateShdhhp(v)
      }, Math.random() * 1000 + 100 * k);
    });
  }
  UpdateShdhhp() {
    console.log(this.ListSP);
    this.ListSP.forEach((v: any, k: any) => {
      v.idSP = k + 1
      this._ShdhhpService.UpdateShdhhp(v)
    });
  }
  async ChoosenDate() {
    this.SearchParams.Batdau = moment(this.SearchParams.Batdau).startOf('day').toDate(),
      this.SearchParams.Ketthuc = moment(this.SearchParams.Ketthuc).endOf('day').toDate(),
      this.ListSP = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    this.dataSource = new MatTableDataSource(this.ListSP.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      jsonData.forEach((v: any, k: any) => {
        setTimeout(() => {
          this._ShdhhpService.CreateShdhhp(v)
        }, Math.random() * 1000 + 100 * k);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }
  writeExcelFile() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ListSP.items);
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

