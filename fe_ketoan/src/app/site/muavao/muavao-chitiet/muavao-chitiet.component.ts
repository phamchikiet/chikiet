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
import { MuavaoService } from '../muavao.service';
import { ChangeDateBegin, ChangeDateEnd, groupByfield, mergeNoDup } from 'fe_ketoan/src/app/shared/shared.utils';
import { NhapsanphamService } from '../nhapsanpham.service';
@Component({
  selector: 'app-muavaochitiet',
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
  templateUrl: './muavao-chitiet.component.html',
  styleUrls: ['./muavao-chitiet.component.css']
})
export class MuavaochitietComponent implements OnInit {
  _MuavaoService: MuavaoService = inject(MuavaoService);
  _NhapsanphamService: NhapsanphamService = inject(NhapsanphamService);
  displayedColumns: string[] = ['SHD', 'Thang', 'ten', 'dvtinh', 'dgia', 'sluong', 'thtien', 'tgtttbso'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  ListInit: any[] = []
  List3: any[] = []
  Listfilter: any[] = []
  ListMuavao: any
  ListMuavaochitiet: any
  Chonngay: any = { Batdau: new Date('2023-01-01'), Ketthuc: new Date('2023-01-31') }
  ttxly: any = 5
  Thang: any = 1
  Nam: any = 2023
  Token: any = localStorage.getItem('TokenWeb')
  SearchParams: any = {
    Thang: 1,
    Type: "NHAP",
    pageSize: 1000,
    pageNumber: 0
  };
  ListSanpham: any[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() { }
  async ngOnInit() {
    this.ListMuavao = await this._MuavaoService.SearchMuavao(this.SearchParams)
    this.ListMuavaochitiet = await this._MuavaoService.SearchMuavaochitiet(this.SearchParams)
    console.log(this.ListMuavaochitiet);

    this.ListSanpham = this.ListMuavaochitiet.items.flatMap((v: any) => {
      const dulieu = v.Dulieu.hdhhdvu as any[];
      return dulieu.map((v1: any) => ({
        dgia: v1.dgia,
        dvtinh: v1.dvtinh,
        sluong: v1.sluong,
        ten: v1.ten,
        thtien: v1.thtien,
        SHD: v.SHD,
        Thang: v.Thang,
        tgtttbso: v.Dulieu.tgtttbso
      }));
    });
    this.dataSource = new MatTableDataSource(this.ListSanpham);
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
  async onChangeThang(event: MatSelectChange) {
    this.Thang = event.value
    this.ListMuavao = await this._MuavaoService.SearchMuavao({ Thang: this.Thang, Type: "NHAP" })
    console.log(this.ListMuavao);

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
    console.log(this.ListMuavao.items);

    this.ListMuavao.items.forEach((v: any, k: any) => {
      const value = v.Dulieu[0]
      setTimeout(async () => {
        const result = await this._MuavaoService.GetMuavaochitiets(value.nbmst, value.khhdon, value.shdon, value.khmshdon, this.Token)
        console.log(result);
        if (result && Object.entries(result).length > 0) {
          const item: any = {}
          item.Dulieu = result
          item.SHD = v.SHD
          item.Thang = v.Thang
          item.Type = v.Type
          this._MuavaoService.Createvaochitiet(item)
        }
      }, Math.random() * 1000 + k * 1000);
    });
  }
  async LoadMuavaochitiet() {
    this.ListMuavaochitiet = await this._MuavaoService.SearchMuavaochitiet(this.SearchParams)
    this.ListMuavao = await this._MuavaoService.SearchMuavao(this.SearchParams)
    // this.Listfilter = this.ListMuavaochitiet.items.map((v:any)=>(v.Dulieu[0]))  
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
    this._MuavaoService.UpdateMuavaochitiet(item)
  }
  FilterHoadon() {
    // this.Listfilter = this.Listfilter.filter((v)=>SHDMuavaochitiet.some((v1:any)=>v1.SHDBR == v.shdon))
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
      this._MuavaoService.UpdateMuavaochitiet(item)
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
    this._MuavaoService.DeleteMuavaochitiet(id)
  }
}

