import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MuavaoService } from '../muavao.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { SHDMuavao } from '../muavao';
@Component({
  selector: 'app-muavao-chitiet',
  standalone: true,
  imports: [CommonModule, 
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
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
export class MuavaoChitietComponent implements OnInit {
  Chonngay: any = { Batdau: new Date('2022-01-01'), Ketthuc: new Date('2024-01-01') }
  _MuavaoService: MuavaoService = inject(MuavaoService);
  displayedColumns: string[] = ['ten','ttxly','SHD', 'soluong', 'dgia', 'thanhtien', 'dvtinh','Ngaytao', 'loai'];
  dataSource!: MatTableDataSource<any>;
  List: any[] = []
  List1: any[] = []
  List2: any[] = []
  List3: any[] = []
  data2: any[] = []
  isFilter:boolean=false
  ttxly:any=5
  SHDMuavao:any=SHDMuavao
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {
    this._MuavaoService.getAllMuavaoChitiet()
    this._MuavaoService.muavaochitiets$.subscribe((data: any) => {
      if (data) {
        let data2:any
        console.log(data);
        data = data.filter((v:any)=>SHDMuavao.some((v1)=>v1.SHDMV == v.SHD))
       // data = data.filter((v:any)=>v.Status==3)
        console.log(data);
        // data.forEach((v:any) => {          
        //   v.Status =3
        //   this._MuavaoService.UpdateMuavaoChitiet(v)
        // });
       // data2 = SHDMuavao.filter((v:any)=>!data.some((v1:any)=>v1.SHD == v.SHDMV))
      // console.log(data2);
        this.List = data.map((v:any) =>({...{ idServer: v.id },...v.Dulieu}));
        this.List.forEach((v: any) => {
          if (v.hdhhdvu.length > 0) {
            v.hdhhdvu = v.hdhhdvu.map((v1: any) => {
              const item = { ...v1,...{ idServer: v.idServer },...{ SHD: v.shdon },...{ ttxly: v.ttxly },...{ Ngaytao: new Date(v.tdlap) } }
              return item
            });
          }
          this.data2 = [...this.data2, ...v.hdhhdvu]
        });
     // console.log(this.data2);
       this.List1 = this.data2.map((v: any) => ({ ten: v.ten,idServer: v.idServer, soluong: v.sluong, ttxly: v.ttxly,SHD: v.SHD,Ngaytao: v.Ngaytao, dgia: v.dgia,thtien: v.thtien, thanhtien: v.sluong * v.dgia, dvtinh: v.dvtinh, loai: "Nhap" }))
       this.List2 = this.List1
       
      //  this.List2 = this.List1
      //     .filter((obj, i) => this.List1.findIndex(o => o.ten === obj.ten) === i)
      //     .map(obj => ({
      //       ten: obj.ten,
      //       SHD: obj.SHD,
      //       Ngaytao: obj.Ngaytao,
      //       soluong: this.List1.filter(o => o.ten === obj.ten).reduce((total, o) => total + o.soluong, 0),
      //       thanhtien: this.List1.filter(o => o.ten === obj.ten).reduce((total, o) => total + o.thanhtien, 0),
      //       dgia: obj.dgia,
      //       dvtinh: obj.dvtinh,
      //       loai: "Nhap"
      //     }));          

       this.dataSource = new MatTableDataSource(this.List2);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
       console.log(this.List1);
      }
    })
  }
  ngOnInit(): void { }
  ChangeDate() {
    // v.Status==2 && 
    this.List2 = this.List1.filter((v: any) => {
      const Ngaytao = new Date(v.Ngaytao)
        return v.ttxly==this.ttxly && Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
      })
      this.dataSource = new MatTableDataSource(this.List2);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  FilterHoadon()
  {
    this.isFilter=!this.isFilter
    if(this.isFilter)
    {
        // this.List3 = this.List1.filter((obj, index, self) => {
        //   return index === self.findIndex((o) => o.SHD === obj.SHD);
        // });


       this.List3 = this.List1
          .filter((obj, i) => this.List1.findIndex(o => o.SHD === obj.SHD) === i)
          .map(obj => ({
            ten: obj.ten,
            SHD: obj.SHD,
            Ngaytao: obj.Ngaytao,
            soluong: this.List1.filter(o => o.SHD === obj.SHD).reduce((total, o) => total + o.soluong, 0),
            thanhtien: this.List1.filter(o => o.SHD === obj.SHD).reduce((total, o) => total + o.thanhtien, 0),
            dgia: obj.dgia,
            dvtinh: obj.dvtinh,
            loai: "Nhap"
          }));  


        this.dataSource = new MatTableDataSource(this.List3);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    else{
        this.dataSource = new MatTableDataSource(this.List1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

  }
  onSelectChange(event: MatSelectChange) {
    this.List2 = this.List1.filter((v: any) => {
      const Ngaytao = new Date(v.Ngaytao)
      return v.ttxly==event.value && Ngaytao.getTime() >= this.Chonngay.Batdau.getTime() && Ngaytao.getTime() <= this.Chonngay.Ketthuc.getTime()
    })
      this.dataSource = new MatTableDataSource(this.List2);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
}

