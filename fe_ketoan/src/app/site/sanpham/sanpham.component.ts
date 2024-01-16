import { Component, OnInit, inject } from '@angular/core';
import { CauhinhService } from '../cauhinh/cauhinh.service';
import { SanphamService } from './sanpham.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sanpham',
  standalone: true,
  imports:[MatButtonModule],
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  ListSP: any[] = []
  constructor() { }
  _CauhinhService: CauhinhService = inject(CauhinhService);
  _SanphamService: SanphamService = inject(SanphamService);
  async ngOnInit() {
    const ListChitiet = await this._CauhinhService.getAll()
    this.ListSP = await this._SanphamService.getAllSanpham()
    //   const groupedObjects = await ListChitiet.reduce((acc:any, obj:any) => {
    //     const group = acc.get(obj.ten) || [];
    //     group.push(obj);
    //     acc.set(obj.ten, group);
    //     return acc;
    //   }, new Map());
    //  const result =  Array.from(groupedObjects.entries()).map(([ten]: any) => ({ TenSP:ten }));
    //  result.forEach((v:any,k:any) => {
    //   setTimeout(() => {
    //     this._SanphamService.CreateSanpham(v)
    //   }, k*1);
    //  });       
  }
  UpdateSanpham() {
    console.log(this.ListSP);
    this.ListSP.forEach((v: any, k: any) => {
      v.idSP = k + 1
      this._SanphamService.UpdateSanpham(v)
    });
  }

}
