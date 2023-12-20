import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MuavaoService } from './muavao.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-muavao',
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
  templateUrl: './muavao.component.html',
  styleUrls: ['./muavao.component.css']
})
export class MuavaoComponent implements OnInit {

  _MuavaoService: MuavaoService = inject(MuavaoService);
  displayedColumns: string[] = ['shdon', 'nbten', 'tgtcthue', 'tgtthue', 'tgtttbso', 'thtttoan','action'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  Listfilter: any[] = []
  Chonngay: any = { Batdau: new Date('2023-10-01'), Ketthuc: new Date('2023-11-30') }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this._MuavaoService.ListMuavaos()
    this._MuavaoService.muavaos$.subscribe((data: any) => {
      if (data) {
        this.List =data
        this.Listfilter = data.filter((v: any) => {
          const Ngaytao = new Date(v.Dulieu.tdlap)
          return v.Status==2 && Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
        })
       // this.Listfilter =data2.map((v:any) => [...v.Dulieu,{id:v.id},{Status:v.Status}]);
       console.log(this.List);
      }
      this.dataSource = new MatTableDataSource(this.Listfilter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngOnInit(): void { }
  ChangeDate() {
    // v.Status==2 && 
    this.Listfilter = this.List.filter((v: any) => {
      const Ngaytao = new Date(v.Dulieu.tdlap)
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
    const totalSum = items.reduce((total:any, item:any) => total + item.Dulieu[field], 0);
    return totalSum
    }
    else return 0
  }
  Update(item:any)
  {
    console.log(item);
    item.Status = 2
    this._MuavaoService.UpdateMuavao(item)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(this.dataSource.filteredData);
    
  }
}

