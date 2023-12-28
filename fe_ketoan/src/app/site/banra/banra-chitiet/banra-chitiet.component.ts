import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { BanraService } from '../banra.service';
@Component({
  selector: 'app-banra-chitiet',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './banra-chitiet.component.html',
  styleUrls: ['./banra-chitiet.component.css']
})
export class BanraChitietComponent implements OnInit {

  _BanraService: BanraService = inject(BanraService);
  displayedColumns: string[] = ['ten','SHD', 'soluong', 'dgia', 'thanhtien', 'dvtinh','Ngaytao', 'loai'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  List1: any[] = []
  data2: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this._BanraService.getBanrachitiets()
    this._BanraService.banrachitiets$.subscribe((data: any) => {
      if (data) {
       this.List = data.map((v:any)=>(v.Dulieu))
       this.List.forEach((v: any) => {
         if (v.hdhhdvu.length > 0) {
           v.hdhhdvu = v.hdhhdvu.map((v1: any) => {
             const item = { ...v1, ...{ SHD: v.shdon },...{ Ngaytao: new Date(v.ntao) } }
             return item
           });
         }
         this.data2 = [...this.data2, ...v.hdhhdvu]
       });
      console.log(this.data2);
      this.List1 = this.data2.map((v: any) => ({ ten: v.ten, soluong: v.sluong,SHD: v.SHD,Ngaytao: v.Ngaytao, dgia: v.dgia, thanhtien: v.sluong * v.dgia, dvtinh: v.dvtinh, loai: "Nhap" }))
        this.dataSource = new MatTableDataSource(this.List1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.writeExcelFile(newData)
      }
    })

  }
  ngOnInit(): void { }
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

