import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GiohangService } from '../giohang/giohang.service';
import { ForminAdminComponent } from 'fe_shop/src/formin/formin-admin/formin-admin.component';

@Component({
  selector: 'app-tracuudon',
  standalone:true,
  imports:[
    ForminAdminComponent
  ],
  templateUrl: './tracuudon.component.html',
  styleUrls: ['./tracuudon.component.css']
})
export class TracuudonComponent implements OnInit {
  _GiohangService: GiohangService = inject(GiohangService)
  constructor(private activatedRoute: ActivatedRoute) { }
  MaDonHang:any
  Donhang:any
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.MaDonHang = params['MaDonHang']
      console.log(params);
      this._GiohangService.getDonhangByMaDonHang(this.MaDonHang)
      this._GiohangService.donhang$.subscribe((data)=>{
        if(data){
          this.Donhang = data
        }
      })
    });
  }

}
