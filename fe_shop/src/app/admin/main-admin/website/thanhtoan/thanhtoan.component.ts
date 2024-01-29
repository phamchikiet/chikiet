import { DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { GiohangService } from '../giohang/giohang.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { NotifierService } from 'angular-notifier';
import { ListNotifyType } from 'fe_shop/src/app/shared/shared.utils';
import { FormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-thanhtoan',
  standalone:true,
  imports:[DecimalPipe,
    FormsModule,
    MatRadioModule
  ],
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent implements OnInit {

  _GiohangService: GiohangService = inject(GiohangService)
  _NotifierService: NotifierService = inject(NotifierService)
  Giohangs: any[] = []
  Khachhang:any={}
  Phivanchuyen: any = 10
  Giamgia: any = 30
  ListNotifyType:any=ListNotifyType
  Notify:any={}
  Donhang:any={}
  Thanhtoan:any={Hinhthuc:'COD'}
  Vanchuyen:any={}
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._GiohangService.getDonhang()
    this._GiohangService.donhang$.subscribe((data: any) => {
      console.log(data)
      this.Giohangs = data?.Giohangs
      this.Donhang = data
    })
  }
  GetTotal(data: any, field: any, field1: any) {    
    if (field1) {
      return data?.reduce((acc: any, item: any) => acc + item[field] * item[field1].gia, 0) || 0;
    }
    else {
      return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
    }
  }
  GetTongcong() {
    return this.GetTotal(this.Giohangs, 'Soluong', 'Giachon') + this.Phivanchuyen + this.Giamgia + this.GetTotal(this.Giohangs, 'Thue', '')
  }
  Xacnhandonhang(customSnackbar:TemplateRef<any>)
  {
   this.Khachhang = {Hoten:"test",Diachi:"test",SDT:"0987654321"}
    if(!this.Khachhang.Hoten)
    {
      this.Notify.Noidung = "Vui Lòng Nhập Họ Tên"
      this.Notify.type = "danger"
      this._snackBar.openFromTemplate(customSnackbar, {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:"danger",
        duration: 2000,
      });
    }
    else if(!this.Khachhang.Diachi)
    {
      this.Notify.Noidung = "Vui Lòng Nhập Địa Chỉ"
      this.Notify.type = "danger"
      this._snackBar.openFromTemplate(customSnackbar, {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:"danger",
        duration: 2000,
      });
    }
    else if(!this.Khachhang.SDT)
    {
      this.Notify.Noidung = "Vui Lòng Nhập Số Điện Thoại"
      this.Notify.type = "danger"
      this._snackBar.openFromTemplate(customSnackbar, {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:"danger",
        duration: 2000,
      });
    }
    else
    {
      this.Donhang.Khachhang =this.Khachhang 
      this.Donhang.Thanhtoan =this.Thanhtoan 
      this.Donhang.Vanchuyen =this.Vanchuyen 
      this._GiohangService.CreateDonhang(this.Donhang).then((data:any)=>
      {
        window.location.href = `cam-on?MaDonHang=${data.MaDonHang}`;
      })

    }

  }

}