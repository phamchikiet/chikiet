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
  displayedColumns: string[] = ['Tenhang','SHD', 'Soluong', 'Gia', 'Tongtien', 'Loai'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  Chonngay: any = { Batdau: new Date('2022-01-01'), Ketthuc: new Date('2024-01-01') }
  ttxly:any=5
  Data1:any = Data
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  _CauhinhService: CauhinhService = inject(CauhinhService);
  constructor() {}
  FindHoadon()
  {
    this._CauhinhService.FindHoadon('02','312')
  }
  ngOnInit() {
     this.Data1.forEach((v:any)=>{
      v.Tongtien = Number(v.Tongtien)
     })
      this.Data1 = this.Data1
          .filter((obj: { Tenhang: any; }, i: any) => this.Data1.findIndex((o: { Tenhang: any; }) => o.Tenhang === obj.Tenhang) === i)
          .map((obj: { Tenhang: any; SHD: any; Gia: any; Loai: any; }) => ({
            Tenhang: obj.Tenhang,
            SHD: obj.SHD,
            Soluong: this.Data1.filter((o: { Tenhang: any; }) => o.Tenhang === obj.Tenhang).reduce((total: any, o: { Soluong: any; }) => total + o.Soluong, 0),
            Tongtien: this.Data1.filter((o: { Tenhang: any; }) => o.Tenhang === obj.Tenhang).reduce((total: any, o: { Tongtien: any; }) => total + o.Tongtien, 0),
            Gia: obj.Gia,
            Loai: obj.Loai,
          }));  
       this.dataSource = new MatTableDataSource(this.Data1);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
   }
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  Subtotal(items:any[],field:any)
  {
    if(items.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => total + item[field], 0);
    return totalSum
    }
    else return 0
  }
  FilterHoadon()
  {
    this.dataSource = new MatTableDataSource(this.Listfilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
}

