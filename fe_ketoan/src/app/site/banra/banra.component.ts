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
import { ChangeDateBegin, ChangeDateEnd } from '../../shared/shared.utils';
import { ShdhhpService } from '../shdhhp/shdhhp.service';
import * as moment from 'moment';
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
    FormsModule,
  ],
  templateUrl: './banra.component.html',
  styleUrls: ['./banra.component.css']
})
export class BanraComponent implements OnInit {
  _BanraService: BanraService = inject(BanraService);
  _ShdhhpService: ShdhhpService = inject(ShdhhpService);
  displayedColumns: string[] = ['shdon','ttxly', 'nbten', 'tgtcthue', 'tgtthue', 'tgtttbso', 'thtttoan','action'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  Chonngay: any = { Batdau: new Date("2023-01-01"), Ketthuc: new Date("2023-01-31") }
  ttxly:any=5
  SHD:any=5
  Token:any=localStorage.getItem('TokenWeb')
  // SHDBanra:any = SHDBanra
  HDBanra:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  async ngOnInit() {
    this.HDBanra  = await this._ShdhhpService.getAllShdhhp()
    this.HDBanra = this.HDBanra.filter((v:any)=>v.Type=='XUAT')
    console.log(this.HDBanra);
    
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
  TimHD() {
    this.HDBanra = this.HDBanra.filter((v:any)=>Number(v.Thang)==moment(this.Chonngay.Batdau).month()+1)
    console.log(this.HDBanra);
    localStorage.setItem('TokenWeb',this.Token)
    this.HDBanra.forEach((v:any,k:any) => {
      setTimeout(async () => {
        const result = await this._BanraService.GetBanra(ChangeDateBegin(this.Chonngay.Batdau),ChangeDateEnd(this.Chonngay.Ketthuc),v.SHD,this.Token)
        if(result)
        {
        const item:any={}
        item.Dulieu=result
        item.SHD = v.SHD
        this._BanraService.CreateBanras(item)
        }
        console.log(v.SHD,result);    
      }, Math.random()*1000 + k*1000);
    });

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

