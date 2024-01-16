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
@Component({
  selector: 'app-shdhhp',
  standalone: true,
  imports:[
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    JsonPipe
  ],
  templateUrl: './shdhhp.component.html',
  styleUrls: ['./shdhhp.component.css']
})
export class ShdhhpComponent implements OnInit {
  ListSP: any={}
  Query:any={}
  constructor() { }
  _ShdhhpService: ShdhhpService = inject(ShdhhpService);
  displayedColumns: string[] = ['SHD', 'Thang', 'Type'];
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
  async onPageChange(event:any)
  {
    this.Query.pageSize=event.pageSize
    this.Query.pageNumber=event.pageIndex
    this.ListSP = await this._ShdhhpService.SearchShdhhp(this.Query)
    this.dataSource = new MatTableDataSource(this.ListSP.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  async ngOnInit() {
    this.ListSP = await this._ShdhhpService.SearchShdhhp(this.Query)
    this.dataSource = new MatTableDataSource(this.ListSP.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.ListSP);       
  }
  UpdateShdhhp() {
    console.log(this.ListSP);
    this.ListSP.forEach((v: any, k: any) => {
      v.idSP = k + 1
      this._ShdhhpService.UpdateShdhhp(v)
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
       // delete v.
        setTimeout(() => {
          this._ShdhhpService.CreateShdhhp(v)
        }, Math.random()*1000 + 100*k);
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
