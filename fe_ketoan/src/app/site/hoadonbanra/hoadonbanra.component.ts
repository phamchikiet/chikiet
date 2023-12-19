import {AfterViewInit, Component, OnInit, ViewChild, inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HoadonbanraService } from './hoadonbanra.service';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
  @Component({
    selector: 'app-hoadonbanra',
    standalone:true,
    imports: [CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
    templateUrl: './hoadonbanra.component.html',
    styleUrls: ['./hoadonbanra.component.css']
  })
  export class HoadonbanraComponent implements AfterViewInit,OnInit {
  _HoadonbanraService: HoadonbanraService = inject(HoadonbanraService);
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource: MatTableDataSource<UserData>;
    List:any[]=[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  flattenData(data:any) {
    console.log(data);
    
    const flattenedData:any[] = [];
    data.forEach((item:any) => {      
      flattenedData.push(item);
      if (item.hdhhdvu) {
        flattenedData.push(...this.flattenData(item.hdhhdvu));
      }
    });
    return flattenedData;
  };
  ngOnInit(): void {
      this._HoadonbanraService.getAllHoadonbanras()
      this._HoadonbanraService.hoadonbanras$.subscribe((data:any)=>
      {
        if(data)
        {
          let data1:any[] = []
          let data2:any[] = []
          data.data.forEach((v:any) => {
            data1.push(v.Dulieu)
          });
          data1.forEach((v:any) => {
            data2 =[...data2,...v.hdhhdvu]
          });
          console.log(data2);
          
          this.List = data2.map((v:any)=>({ten:v.ten,soluong:v.sluong,dgia:v.dgia,thanhtien:v.sluong*v.dgia,dvtinh:v.dvtinh,loai:"Nhap"}))
          console.log(this.List);         
          const newData = this.List
            .filter((obj, i) => this.List.findIndex(o => o.ten === obj.ten) === i)
            .map(obj => ({
              ten: obj.ten,
              soluong: this.List.filter(o => o.ten === obj.ten).reduce((total, o) => total + o.soluong, 0),
              thanhtien: this.List.filter(o => o.ten === obj.ten).reduce((total, o) => total + o.thanhtien, 0),
              dgia:obj.dgia,
              dvtinh:obj.dvtinh,
              loai:"Nhap"
            }));
          
          console.log(newData); 

       // this.writeExcelFile(newData)
        }       
      })
    }
    writeExcelFile(data:any) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([
      //   {id:'TeXqj8Q2', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      //   {id:'TeXqj8Q3', Ngay: '02_06_2023',Buy: '1111', Sell: '11111' },
      // ]);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}

