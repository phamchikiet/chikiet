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
import * as moment from 'moment';
import { ChangeDateBegin, ChangeDateEnd, CombineUnique, mergeNoDup } from '../../shared/shared.utils';
import { ShdhhpService } from '../shdhhp/shdhhp.service';
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
  _ShdhhpService: ShdhhpService = inject(ShdhhpService);
  displayedColumns: string[] = ['shdon','ngaytao','ttxly', 'nbten', 'tgtcthue', 'tgtthue', 'tgtttbso', 'thtttoan','action'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  HoadonHHP: any
  ListBanra: any
  Chonngay: any = { Batdau: new Date('2024-01-01'), Ketthuc: new Date('2024-01-31') }
  ttxly:any=5
  Thang:any=1
  Nam:any=2023
  Token:any=localStorage.getItem('TokenWeb')
  SearchParams: any = {
    Thang:1,
    Nam:2024,
    Type:"XUAT",
    pageSize:1000,
    pageNumber:0
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  async ngOnInit() {
    this.HoadonHHP  = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    this.ListBanra  = await this._BanraService.SearchBanra(this.SearchParams)
    // this.ListBanra.items.forEach((v:any) => {
    //   v.Ngaytao = moment(v.Dulieu.tdlap).format("YYYY-MM-DD")
    //   this._BanraService.UpdateBanra(v)
    // });
    this.Listfilter = this.ListBanra.items.map((v:any)=>({idServer:v.id,SHD:v.SHD,Thang:v.Thang,Ngaytao:v.Ngaytao,...v.Dulieu[0]}))  
    console.log(this.Listfilter); 
    this.Listfilter.forEach((v:any) => {
      const result = this.HoadonHHP.items.some((v1:any)=>v1.SHD===v.SHD)
      console.log(result);
    }); 
      this.dataSource = new MatTableDataSource(this.Listfilter);
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
  async onChangeThang(event:MatSelectChange)
  {
    this.Thang=event.value
    this.HoadonHHP  = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    console.log(this.HoadonHHP);
    
    // this.dataSource = new MatTableDataSource(this.ListSP?.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  async onChangeTinhtrang(event:MatSelectChange)
  {
    console.log(event.value);
    

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
  TimHD() {
    localStorage.setItem('TokenWeb',this.Token)
    console.log(this.HoadonHHP);
    console.log(this.Listfilter);
    const data1Ids = new Set(this.ListBanra.items.map((obj: any) => obj.SHD));
    const data = this.HoadonHHP.items.filter((obj: any) => !data1Ids.has(obj.SHD));
    
    console.log(data);
    data.forEach((v:any,k:any) => {
      setTimeout(async () => {
        const result = await this._BanraService.GetBanras(ChangeDateBegin(this.Chonngay.Batdau),ChangeDateEnd(this.Chonngay.Ketthuc),v.SHD,this.Token,this.ttxly)
        console.log(result);
        
        if(result && result.datas.length>0)
        {
        const item:any={}
        item.Dulieu=result.datas
        item.SHD = v.SHD
        item.Thang = v.Thang
        item.Nam = v.Nam
        item.Type = v.Type
        item.Ngaytao = moment(result.datas[0].tdlap).format("YYYY-MM-DD")
        this._BanraService.CreateBanras(item)
        }   
      }, Math.random()*1000 + k*1000);
    });
  }
  async LoadBanra()
  {
    this.ListBanra  = await this._BanraService.SearchBanra(this.SearchParams)
    this.HoadonHHP  = await this._ShdhhpService.SearchShdhhp(this.SearchParams)
    this.Listfilter = this.ListBanra.items.map((v:any)=>(v.Dulieu[0]))  
    console.log(this.Listfilter.map((v:any)=>({shd:v.shdon}))); 
    if(this.Listfilter.length>0)   
    {
      this.dataSource = new MatTableDataSource(this.Listfilter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.Listfilter);
    }
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
    console.log(this.Listfilter);
    
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

