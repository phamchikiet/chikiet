// import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { CommonModule } from '@angular/common';
// import * as XLSX from 'xlsx';
// import { MuavaoService } from '../muavao.service';
// @Component({
//   selector: 'app-muavao-chitiet',
//   standalone: true,
//   imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
//   templateUrl: './muavao-chitiet.component.html',
//   styleUrls: ['./muavao-chitiet.component.css']
// })
// export class MuavaoChitietComponent implements OnInit {

//   _MuavaoService: MuavaoService = inject(MuavaoService);
//   displayedColumns: string[] = ['ten','SHD', 'soluong', 'dgia', 'thanhtien', 'dvtinh','Ngaytao', 'loai'];
//   dataSource!: MatTableDataSource<any>;
//   List: any[] = []
//   List1: any[] = []
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
//   constructor() {
//     this._MuavaoService.getAllMuavaoChitiet()
//     this._MuavaoService.muavaochitiets$.subscribe((data: any) => {
//       if (data) {
//         console.log(data);
//         console.log(data.data.map((v:any)=>(v.Dulieu)));
//         this.List = data.data.map((v:any)=>(v.Dulieu))
//         // data1.forEach((v: any) => {
//         //   if (v.hdhhdvu.length > 0) {
//         //     v.hdhhdvu = v.hdhhdvu.map((v1: any) => {
//         //       const item = { ...v1, ...{ SHD: v.shdon },...{ Ngaytao: new Date(v.ntao) } }
//         //       return item
//         //     });
//         //   }
//         //   data2 = [...data2, ...v.hdhhdvu]
//         // });
//        // console.log(data2);
//       //   this.List = data2.map((v: any) => ({ ten: v.ten, soluong: v.sluong,SHD: v.SHD,Ngaytao: v.Ngaytao, dgia: v.dgia, thanhtien: v.sluong * v.dgia, dvtinh: v.dvtinh, loai: "Nhap" }))
//       // //  console.log(this.List);         
//       //   const newData = this.List
//       //     .filter((obj, i) => this.List.findIndex(o => o.ten === obj.ten) === i)
//       //     .map(obj => ({
//       //       ten: obj.ten,
//       //       SHD: obj.SHD,
//       //       Ngaytao: obj.Ngaytao,
//       //       soluong: this.List.filter(o => o.ten === obj.ten).reduce((total, o) => total + o.soluong, 0),
//       //       thanhtien: this.List.filter(o => o.ten === obj.ten).reduce((total, o) => total + o.thanhtien, 0),
//       //       dgia: obj.dgia,
//       //       dvtinh: obj.dvtinh,
//       //       loai: "Nhap"
//       //     }));
//       //   console.log(newData); 
//         //this.List = newData
//         // console.log(this.List);

//         this.dataSource = new MatTableDataSource(this.List);
//         this.dataSource.paginator = this.paginator;
//         this.dataSource.sort = this.sort;
//         // this.writeExcelFile(newData)
//       }
//     })

//   }
//   ngOnInit(): void { }
//   writeExcelFile(data: any) {
//     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
//     const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     this.saveAsExcelFile(excelBuffer, 'data');
//   }
//   saveAsExcelFile(buffer: any, fileName: string) {
//     const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
//     const url: string = window.URL.createObjectURL(data);
//     const link: HTMLAnchorElement = document.createElement('a');
//     link.href = url;
//     link.download = `${fileName}.xlsx`;
//     link.click();
//     window.URL.revokeObjectURL(url);
//     link.remove();
//   }
//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
// }

