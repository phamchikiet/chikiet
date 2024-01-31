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
  isHave:boolean=true;
  async ngOnInit() {
    this.ListSP = await this._SanphamService.getAllSanpham()  
    this.ListSPChung = await this._SanphamService.getAllSanphamChung()  
    console.log(this.ListSPChung);
    this.ListSP.forEach((v)=>
    {
      const matchingHave = this.ListSPChung.find((n:any) => 
      n.TenSP == v.TenSP 
      ||n.TenSPXuat == v.TenSP 
      ||n.TenSPNhap == v.TenSP
      ||n.TenSP1 == v.TenSP
      ||n.TenSP2 == v.TenSP
      ||n.TenSP3 == v.TenSP
      ||n.TenSP4 == v.TenSP
      );
      v.isHave= matchingHave ? true : false
      return v
    })
    console.log(this.ListSP);
    
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
    if(filterValue.length>2)
    {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  }
  Chonsanpham(item:any)
  {
    console.log(item);
    
    if(this.Select==0)
    {
      this.Sanphamchung.TenSP =item
      this.Sanphamchung.TenSPXuat =item
      this.Select =1
    }
    else if (this.Select==1)
    {
      this.Sanphamchung.TenSPNhap =item
      this.Select =2
    }
    else if (this.Select==2)
    {
      this.Sanphamchung.TenSP1 =item
      this.Select =3
    }
    else if (this.Select==3)
    {
      this.Sanphamchung.TenSP2 =item
      this.Select =4
    }
    else if (this.Select==4)
    {
      this.Sanphamchung.TenSP3 =item
      this.Select =5
    }
    else
    {
      this.Sanphamchung.TenSP4 =item
      this.Select =6
    }
  }
  Reset()
  {
    this.Sanphamchung={TenSP:'',TenSPXuat:'',TenSPNhap:''};
    this.Select=0
  }
  LocSP()
  {
    this.isHave = !this.isHave
    const data = this.ListSP.filter((v)=> v.isHave==this.isHave)    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.Total = this.ListSP.length
    this.pageSizeOptions = [10, 20, this.Total].filter(v => v <= this.Total);
  }
  CreateSanpham()
  {
    this._SanphamService.CreateSanphamChung(this.Sanphamchung).then(()=>{this.Reset()})
    // if(this.Sanphamchung.TenSP=='')
    // {
    //   console.log("Chọn tên");
    // }
    // else if(this.Sanphamchung.TenSPXuat=='')
    // {
    //   console.log("Chọn tên");
    // }
    // else if(this.Sanphamchung.TenSPNhap=='')
    // {
    //   console.log("Chọn tên");
    // }
    // else
    // {
    //   this._SanphamService.CreateSanphamChung(this.Sanphamchung).then(()=>{this.Reset()})
    // }

  }

}
