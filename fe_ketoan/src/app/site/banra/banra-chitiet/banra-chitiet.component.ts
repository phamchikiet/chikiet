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
import { BanraService } from '../banra.service';
import { ChangeDateBegin, ChangeDateEnd, FilterDup, groupByfield, mergeNoDup } from 'fe_ketoan/src/app/shared/shared.utils';
import { NhapsanphamService } from '../../muavao/nhapsanpham.service';
import { SanphamService } from '../../sanpham/sanpham.service';
import * as moment from 'moment';
import { XuatkhoService } from '../../xuatkho/xuatkho.service';
@Component({
  selector: 'app-banrachitiet',
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
  templateUrl: './banra-chitiet.component.html',
  styleUrls: ['./banra-chitiet.component.css']
})
export class BanrachitietComponent implements OnInit {
  _BanraService: BanraService = inject(BanraService);
  _NhapsanphamService: NhapsanphamService = inject(NhapsanphamService);
  _SanphamService: SanphamService = inject(SanphamService);
  _XuatkhoService: XuatkhoService = inject(XuatkhoService);
  displayedColumns: string[] = ['SHD', 'Thang','Ngaytao', 'ten', 'dvtinh', 'dgia', 'sluong', 'thtien', 'tgtttbso'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  ListBanra: any
  ListBanrachitiet: any
  ListXuatkho: any
  Chonngay: any = { Batdau: new Date('2023-03-01'), Ketthuc: new Date('2023-03-31') }
  ttxly: any = 5
  Thang: any = 1
  Nam: any = 2023
  Token: any = localStorage.getItem('TokenWeb')
  SearchParams: any = {
    Thang: 3,
    Type: "XUAT",
    pageSize: 500,
    pageNumber: 0
  };
  ListSanpham: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions:any[]=[5]
  Total:any=0
  constructor() { }
  async ngOnInit() {
    this.ListBanra = await this._BanraService.SearchBanra(this.SearchParams)
    this.ListBanrachitiet = await this._BanraService.SearchBanrachitiet(this.SearchParams)
    this.ListXuatkho = await this._XuatkhoService.SearchXuatkho(this.SearchParams)
     console.log(this.ListBanrachitiet);
     console.log(this.ListBanra);
    // console.log(this.ListXuatkho);
    // console.log(this.ListBanrachitiet.items.map((v:any)=>(v.Dulieu)));
    // this.ListBanrachitiet.items.forEach((v:any) => {
    //   v.Ngaytao = moment(v.Dulieu.tdlap).format("YYYY-MM-DD")
    //   this._BanraService.UpdateBanrachitiet(v)
    // });
    this.ListSanpham = this.ListBanrachitiet.items.flatMap((v: any) => {
      const dulieu = v.Dulieu.hdhhdvu as any[];
      return dulieu.map((v1: any) => ({
        idCT:v1.id,
        dgia: v1.dgia,
        dvtinh: v1.dvtinh,
        sluong: v1.sluong,
        ten: v1.ten,
        thtien: v1.thtien,
        SHD: v.SHD,
        Thang: v.Thang,
        Ngaytao :v.Ngaytao,
        tgtttbso: v.Dulieu.tgtttbso
      }));
    });
    // console.log(this.ListSanpham);
    
    this.dataSource = new MatTableDataSource(this.ListSanpham);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Total = this.ListSanpham.length
    this.pageSizeOptions = [10, 20, this.Total].filter(v => v <= this.Total);
  }
  filterSanpham()
  {
    console.log(this.ListSanpham);
    const Sanpham = FilterDup(this.ListSanpham,'ten')
    console.log(Sanpham);
    
    Sanpham.forEach((v:any)=>
    {
      const item:any = {}
      item.TenSP = v.ten
      item.DVT = v.dvtinh
      this._SanphamService.CreateSanpham(item)
    })
  }
  async Xuatkho()
  {
    const data1Ids = new Set(this.ListXuatkho.items.map((obj: any) => obj.idCT));
    const data = this.ListSanpham.filter((obj: any) => !data1Ids.has(obj.idCT));
    data.forEach((v:any,k:any)=>
    {
      setTimeout(() => {
        const item:any={}
        item.idCT = v.idCT;
        item.TenSP = v.ten;
        item.DVT = v.dvtinh;
        item.Soluong = Number(v.sluong);
        item.Giaxuat = Number(v.dgia);
        item.Tongtien = Number(v.thtien);
        item.Giavon = 0;
        item.SHD = v.SHD;
        item.Thang = v.Thang;
        item.Nam = moment(v.Ngaytao).year();
        item.Ngaytao = v.Ngaytao;
        this._XuatkhoService.CreateXuatkhos(item)
      }, Math.random()*100 +k*100);
    }) 
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
  async onChangeThang(event: MatSelectChange) {
    this.Thang = event.value
    this.ListBanra = await this._BanraService.SearchBanra({ Thang: this.Thang, Type: "XUAT" })
    console.log(this.ListBanra);

    // this.dataSource = new MatTableDataSource(this.ListSP?.items);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  async onChangeTinhtrang(event: MatSelectChange) {
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
    localStorage.setItem('TokenWeb', this.Token)
    const data1Ids = new Set(this.ListBanrachitiet.items.map((obj: any) => obj.SHD));
    const data = this.ListBanra.items.filter((obj: any) => !data1Ids.has(obj.SHD));
   
    console.log(data);
    
    data.forEach((v: any, k: any) => {
      const value = v.Dulieu[0]
      setTimeout(async () => {
        const result = await this._BanraService.GetBanrachitiets(value.nbmst, value.khhdon, value.shdon, value.khmshdon, this.Token)
        if (result && Object.entries(result).length > 0) {
          const item: any = {}
          item.Dulieu = result
          item.SHD = v.SHD
          item.Thang = v.Thang
          item.Type = v.Type
          item.Ngaytao =v.Ngaytao
          this._BanraService.CreateBanrachitiets(item)
        }
      }, Math.random() * 1000 + k * 1000);
    });
  }
  async LoadBanrachitiet() {
    this.ListBanrachitiet = await this._BanraService.SearchBanrachitiet(this.SearchParams)
    this.ListBanra = await this._BanraService.SearchBanra(this.SearchParams)
    // this.Listfilter = this.ListBanrachitiet.items.map((v:any)=>(v.Dulieu[0]))  
    // console.log(this.Listfilter.map((v:any)=>({shd:v.shdon}))); 
    // if(this.Listfilter.length>0)   
    // {
    //   this.dataSource = new MatTableDataSource(this.Listfilter);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   console.log(this.Listfilter);
    // }
  }
  Subtotal(items: any[], field: any) {
    if (items.length > 0) {
      const totalSum = items.reduce((total: any, item: any) => total + item[field], 0);
      return totalSum
    }
    else return 0
  }
  CheckSum(items:any[],SHD:any) {
    const group = items.filter((v:any)=>v.SHD==SHD)
    if (group.length > 0) {
      const totalSum = group.reduce((total: any, item: any) => total + item.dgia*item.sluong, 0);
      return totalSum
    }
    else return 0

    // const newData:any[] = [];
    // const groupedData = data.reduce((acc, obj) => {
    //   const existingGroup = acc[obj.id];
    //   if (existingGroup) {
    //     existingGroup.push(obj);
    //   } else {
    //     acc[obj.id] = [obj];
    //   }
    //   return acc;
    // }, {});
    
    // // Calculate Sum for each object within each ID group
    // Object.entries(groupedData).forEach(([id, group]:[any,any]) => {
    //   const totalSum = group.reduce((sum:any, obj:any) => sum + obj.dgia * obj.sluong, 0);
    //   group.forEach((obj:any) => {
    //     newData.push({
    //       ...obj,
    //       Sum: totalSum,
    //     });
    //   });
    // });
    // console.log(newData);
  }
  SubHoadon(items: any[], field: any) {
    const uniqueObjects = items.filter((obj, index) => {
      return items.findIndex(o => o.SHD === obj.SHD) === index;
    });
    if (items.length > 0) {
      const totalSum = uniqueObjects.reduce((total: any, item: any) => total + item[field], 0);
      return totalSum
    }
    else return 0
  }
  Update(item: any) {
    console.log(item);
    item.Status = 2
    this._BanraService.UpdateBanrachitiet(item)
  }
  FilterHoadon() {
    // this.Listfilter = this.Listfilter.filter((v)=>SHDBanrachitiet.some((v1:any)=>v1.SHDBR == v.shdon))
    // console.log(this.Listfilter);

    // this.dataSource = new MatTableDataSource(this.Listfilter);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

  }
  UpdateStatus() {
    console.log(this.Listfilter);
    console.log(this.ListInit);

    this.Listfilter.forEach(v => {
      const item = this.ListInit.find((v1) => v1.id == v.idServer)
      console.log(item);

      item.Status = 3
      this._BanraService.UpdateBanrachitiet(item)
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length > 2) {
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
      return v.ttxly == event.value && Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
    })
    this.dataSource = new MatTableDataSource(this.Listfilter);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // Handle the change
  }
  Delete(id: any) {
    this._BanraService.DeleteBanrachitiet(id)
  }
}

