import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { BanraService } from './banra.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { SHDBanra } from './banra';
@Component({
  selector: 'app-banra',
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
  templateUrl: './banra.component.html',
  styleUrls: ['./banra.component.css']
})
export class BanraComponent implements OnInit {

  _BanraService: BanraService = inject(BanraService);
  displayedColumns: string[] = ['shdon','ttxly', 'nbten', 'tgtcthue', 'tgtthue', 'tgtttbso', 'thtttoan','action'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  Chonngay: any = { Batdau: new Date('2022-01-01'), Ketthuc: new Date('2024-01-01') }
  ttxly:any=5
  SHDBanra:any = SHDBanra
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this._BanraService.ListBanras()
    this._BanraService.banras$.subscribe((data: any) => {
      if (data) {
        this.ListInit =data        
        this.List = data.map((v:any) =>({...{ idServer: v.id },...v.Dulieu}));
        // this.List = data.filter((v:any)=>v.Status==3).map((v:any) =>({...{ idServer: v.id },...v.Dulieu}));
       //this.List = data.map((v:any) =>(v.Dulieu));
        console.log(this.List);
        this.Listfilter = this.List.filter((v: any) => {
          const Ngaytao = new Date(v.tdlap)
          return Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
        })
       // this.Listfilter =data2.map((v:any) => [...v.Dulieu,{id:v.id},{Status:v.Status}]);
      //  this.List.forEach((v)=>
      //  {
      //    v.Ngaytao = new Date(v.Dulieu.tdlap)
      //    this._BanraService.UpdateBanra(v).then((data)=> console.log(data))
      //  })
      }
      this.dataSource = new MatTableDataSource(this.Listfilter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // Xoa()
  // {
  //   this.List3.forEach(v => {
  //     this._BanraService.DeleteBanra(v.id)
  //   });
  // }
  Subtotal(items:any[],field:any)
  {
    if(items.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => total + item[field], 0);
    return totalSum
    }
    else return 0
  }
  Update(item:any)
  {
    console.log(item);
    item.Status = 2
    this._BanraService.UpdateBanra(item)
  }
  FilterHoadon()
  {
    this.Listfilter = this.Listfilter.filter((v)=>SHDBanra.some((v1)=>v1.SHDBR == v.shdon))
    this.dataSource = new MatTableDataSource(this.Listfilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  UpdateStatus()
  {
    console.log( this.Listfilter);
    console.log( this.ListInit);
    
    this.Listfilter.forEach(v => {
      const item = this.ListInit.find((v1)=>v1.id == v.idServer)
      console.log(item);
      
      item.Status =3
      this._BanraService.UpdateBanra(item)
    });
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
  onSelectChange(event: MatSelectChange) {
    this.Listfilter = this.List.filter((v: any) => {
      const Ngaytao = new Date(v.tdlap)
      return v.ttxly==event.value && Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
    })
      this.dataSource = new MatTableDataSource(this.Listfilter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    // Handle the change
  }
  Delete(id:any)
  {
    this._BanraService.DeleteBanra(id)
  }
}
