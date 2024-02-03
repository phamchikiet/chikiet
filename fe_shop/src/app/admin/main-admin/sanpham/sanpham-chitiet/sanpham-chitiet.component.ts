import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SanphamComponent } from '../sanpham.component';
import { SanphamService } from '../sanpham.service';
import { DanhmucService } from '../../danhmuc/danhmuc.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HinhanhComponent } from 'fe_shop/src/app/shared/hinhanh/hinhanh.component';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-sanpham-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    SanphamComponent,
    ButtonModule,
    DropdownModule,
    AutoCompleteModule,
    MatInputModule,
    NgxDropzoneModule,
    HinhanhComponent    
  ],
  templateUrl: './sanpham-chitiet.component.html',
  styleUrls: ['./sanpham-chitiet.component.css']
})
export class SanphamChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _SanphamComponent: SanphamComponent = inject(SanphamComponent);
  _SanphamService: SanphamService = inject(SanphamService);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  idSP:any;
  Detail:any={}
  Danhmuc:any[]=[]
  filteredDanhmuc:any[]=[]
  constructor() {
      this.idSP = this.route.snapshot.params['id'];
  }
  async ngOnInit() {
    this.Detail = await this._SanphamService.getSanphamByid(this.idSP)
    this.Danhmuc = await this._DanhmucService.getAllDanhmuc()
    console.log(this.Detail);
    console.log(this.Danhmuc);
  }
  CloseDrawer()
  {
    this._SanphamComponent.drawer.close()
  }
  GetUpload(e:any)
  {
    console.log(e);
    
    this.Detail.Image.Main = e.src
    this._SanphamService.UpdateSanpham(this.Detail);
  }
  GetUploadList(e:any,i:any)
  {   
    console.log(e);
    this.Detail.ListImage[i] = e
    console.log(this.Detail);
    this._SanphamService.UpdateSanpham(this.Detail);
  }

}
