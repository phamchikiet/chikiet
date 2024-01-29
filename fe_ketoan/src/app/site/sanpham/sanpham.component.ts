import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CauhinhService } from '../cauhinh/cauhinh.service';
import { SanphamService } from './sanpham.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule, DatePipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sanpham',
  standalone: true,
  imports:[
    MatButtonModule,
    MatTableModule, 
    MatSortModule, 
    MatInputModule,
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  ListSP: any[] = []
  ListSPChung: any[] = []
  constructor() { }
  displayedColumns: string[] = ['TenSP', 'TenSP1','TenSP2'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSizeOptions:any
  Total:any=0
  Sanphamchung:any={TenSP:'',TenSPXuat:'',TenSPNhap:''}
  _SanphamService: SanphamService = inject(SanphamService);
  Select:any=0
  async ngOnInit() {
    this.ListSP = await this._SanphamService.getAllSanpham()  
    this.ListSPChung = await this._SanphamService.getAllSanphamChung()  
    console.log(this.ListSPChung);
    
    this.dataSource = new MatTableDataSource(this.ListSP);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Total = this.ListSP.length
    this.pageSizeOptions = [10, 20, this.Total].filter(v => v <= this.Total);    
  }
  UpdateSanpham() {
    console.log(this.ListSP);
    this.ListSP.forEach((v: any, k: any) => {
      v.idSP = k + 1
      this._SanphamService.UpdateSanpham(v)
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Chonsanpham(item:any)
  {
    console.log(item);
    
    if(this.Select==0)
    {
      this.Sanphamchung.TenSPXuat =item
      this.Select =1
    }
    else (this.Select==1)
    {
      this.Sanphamchung.TenSPNhap =item
      this.Select =2
    }
  }
  CreateSanpham()
  {
    if(this.Sanphamchung.TenSP=='')
    {
      console.log("Chọn tên");
    }
    else if(this.Sanphamchung.TenSPXuat=='')
    {
      console.log("Chọn tên");
    }
    else if(this.Sanphamchung.TenSPNhap=='')
    {
      console.log("Chọn tên");
    }
    else
    {
      this._SanphamService.CreateSanphamChung(this.Sanphamchung)
    }

  }

}
