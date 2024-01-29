import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { XuatkhoService } from './xuatkho.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-xuatkho',
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
  templateUrl: './xuatkho.component.html',
  styleUrls: ['./xuatkho.component.css']
})
export class XuatkhoComponent implements OnInit {

  _XuatkhoService: XuatkhoService = inject(XuatkhoService);
  displayedColumns: string[] = ['SHD', 'Thang','Ngaytao','TenSP','DVT','Soluong', 'Giaxuat', 'Giavon','Tongtien'];
  dataSource!: MatTableDataSource<any>;
  ListXuatkho: any
  Listfilter: any[]=[]
  Chonngay: any = { Batdau: new Date('2023-01-01'), Ketthuc: new Date('2023-01-31') }
  SearchParams: any = {
    Thang:1,
    Type:"XUAT",
    pageSize:5,
    pageNumber:0
  };
  pageSizeOptions:any[]=[5]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  async ngOnInit() {
    this.ListXuatkho  = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
    console.log(this.ListXuatkho);
      this.dataSource = new MatTableDataSource(this.ListXuatkho.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageSizeOptions = [10, 20, this.ListXuatkho.totalCount].filter(v => v <= this.ListXuatkho.totalCount);
  }
  ChangeDate() {
    // this.Listfilter = this.ListXuatkho.filter((v: any) => {
    //   const Ngaytao = new Date(v.tdlap)
    //     return Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
    //   })
    //   this.dataSource = new MatTableDataSource(this.Listfilter);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
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
  async LoadXuatkho()
  {
    this.ListXuatkho  = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
    this.Listfilter = this.ListXuatkho.items.map((v:any)=>(v.Dulieu[0]))  
    console.log(this.Listfilter.map((v:any)=>({shd:v.shdon}))); 
    if(this.Listfilter.length>0)   
    {
      this.dataSource = new MatTableDataSource(this.Listfilter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.Listfilter);
    }
  }
  async onChangeThang(event: MatSelectChange) {
    this.SearchParams.Thang = event.value
    this.ListXuatkho = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
    console.log(this.ListXuatkho);

    // this.dataSource = new MatTableDataSource(this.ListSP?.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  Subtotal(items:any[],field:any)
  {
    if(items.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => total + Number(item[field]||0), 0);
    return totalSum
    }
    else return 0
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

