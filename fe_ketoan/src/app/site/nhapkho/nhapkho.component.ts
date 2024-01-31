import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { NhapkhoService } from './nhapkho.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-nhapkho',
  standalone: true,
  imports: [
    CommonModule, 
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
  templateUrl: './nhapkho.component.html',
  styleUrls: ['./nhapkho.component.css']
})
export class NhapkhoComponent implements OnInit {
  _NhapkhoService: NhapkhoService = inject(NhapkhoService);
  displayedColumns: string[] = ['SHD', 'Thang','Ngaytao','TenSP','DVT','Soluong','Quydoi', 'Gianhap', 'Giavon','Tongtien'];
  dataSource!: MatTableDataSource<any>;
  ListNhapkho: any
  Listfilter: any[]=[]
  Chonngay: any = { Batdau: new Date('2023-01-01'), Ketthuc: new Date('2023-01-31') }
  SearchParams: any = {
    Thang:1,
    Type:"NHAP",
    pageSize:5,
    pageNumber:0
  };
  pageSizeOptions:any[]=[5]
  TimSP:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  async ngOnInit() {
    const Nhapkho = await this._NhapkhoService.ListNhapkhos()
    console.log(Nhapkho);
    // Nhapkho.forEach((v:any) => {
    //     if(v.TenSP=='PM vuông Belcube ngọt vị Dâu 78G x 15C')
    //     {
    //    //  v.Quydoi = v.Soluong*15   
    //     this._NhapkhoService.UpdateNhapkho(v)
    //     }
    // });
    
    this.ListNhapkho  = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
    console.log(this.ListNhapkho); 
      this.dataSource = new MatTableDataSource(this.ListNhapkho.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageSizeOptions = [10, 20, this.ListNhapkho.totalCount].filter(v => v <= this.ListNhapkho.totalCount);
  }
  async ChangeDate() {
    this.ListNhapkho  = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
      this.dataSource = new MatTableDataSource(this.ListNhapkho);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageSizeOptions = [10, 20, this.ListNhapkho.items.length].filter(v => v <= this.ListNhapkho.items.length);
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
  async LoadNhapkho()
  {
    this.ListNhapkho  = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
    this.Listfilter = this.ListNhapkho.items.map((v:any)=>(v.Dulieu[0]))  
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
    this.ListNhapkho = await this._NhapkhoService.SearchNhapkho(this.SearchParams)
    console.log(this.ListNhapkho);

    // this.dataSource = new MatTableDataSource(this.ListSP?.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  Subtotal(items:any[],field:any)
  {    
    if(items?.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => total + Number(item[field]||0), 0);
    return totalSum
    }
    else return 0
  }
  UpdateSP(item:any)
  {    
    this._NhapkhoService.UpdateNhapkho(item)
  }
  async applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length> 2)
    {

      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      await this._NhapkhoService.findtensp(filterValue).then((data:any)=>
      {
        if(data)
        {
          if(data)
          {
            this.dataSource = new MatTableDataSource(data.items);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.pageSizeOptions = [10, 20, data.totalCount].filter(v => v <= data.totalCount);
            this.TimSP = data
          }
        }
      })
      console.log(this.TimSP);
    }     
  }
}

