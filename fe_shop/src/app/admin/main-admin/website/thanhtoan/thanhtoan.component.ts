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
import { SendemailService } from 'fe_shop/src/app/sendemail/sendemail-admin/sendemail.service';
import { SlideSanphamComponent } from '../slide-sanpham/slide-sanpham.component';
import { DiachiAdminComponent } from '../../../diachi/diachi-admin/diachi-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { ThanhtoanService } from './thanhtoan.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-thanhtoan',
  standalone:true,
  imports:[
    DecimalPipe,
    FormsModule,
    MatRadioModule,
    SlideSanphamComponent,
    DiachiAdminComponent,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent implements OnInit {

  _GiohangService: GiohangService = inject(GiohangService)
  _NotifierService: NotifierService = inject(NotifierService)
  _SendemailService: SendemailService = inject(SendemailService)
  _ThanhtoanService: ThanhtoanService = inject(ThanhtoanService)
  Phivanchuyen: any = 0
  Khoangcach: any = {}
  Giamgia: any = 30
  ListNotifyType:any=ListNotifyType
  Notify:any={}
  Donhang:any={}
  Diachis:any[]=[]
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._GiohangService.getDonhang()
    this._GiohangService.donhang$.subscribe((data: any) => {
      console.log(data)
      this.Donhang = data
      this.Donhang.Khachhang = {Hoten:"test",Diachi:"test",Email:"chikiet88@gmail.com",SDT:"0987654321"}
    })
  }
  GetDiachi(value:any)
  { 
    this.Donhang.Diachis = value
    const Diachi  = value.find((v:any)=>v.Active==true)  
    this.Donhang.Khachhang.Diachi = `${Diachi.Diachi ? Diachi.Diachi + ', ' : ''}${Diachi.Phuong ? Diachi.Phuong + ', ' : ''}${Diachi.Quan ? Diachi.Quan + ', ' : ''}${Diachi.Tinh || ''}`;
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
    return this.Donhang.Total + this.Phivanchuyen - this.Donhang.Giamgia + this.GetTotal(this.Donhang.Giohangs, 'Thue', '')
  }
  Xacnhandonhang(customSnackbar:TemplateRef<any>)
  {
  this.UpdatePhiship()
  this.Donhang.Khachhang = {Hoten:"test",Diachi:"test",Email:'test@gmail.com',SDT:"0987654321"}
    if(!this.Donhang.Khachhang.Hoten)
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
    else if(!this.Donhang.Khachhang.Email)
    {
      this._snackBar.open('Vui Lòng Nhập Email','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'danger',
        duration: 2000,
      });
    }
    else if(!this.Donhang.Khachhang.Diachi)
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
    else if(!this.Donhang.Khachhang.SDT)
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
      console.log(this.Donhang);
      
      // this._GiohangService.CreateDonhang(this.Donhang).then((data:any)=>
      // {
      //   const item:any={
      //     "host": "smtp.gmail.com",
      //     "port": 587,
      //     "secure": false,
      //     "auth": {
      //       "user": "wetdragon1996@gmail.com",
      //       "pass": "opxbvldmnxgnebsn"
      //     },
      //   "Brand":"Rau Sạch Trần Gia",
      //   "toemail":"chikiet88@gmail.com",
      //   "subject":"123456",
      //   "text":"xinchao"
      //  }
      //   this._SendemailService.SendEmail(item)
      //   this._snackBar.open('Đặt Hàng Thành Công','',{
      //     horizontalPosition: "end",
      //     verticalPosition: "top",
      //     panelClass:'success',
      //     duration: 2000,
      //   });
        
      //   //window.location.href = `cam-on?MaDonHang=${data.MaDonHang}`;
      // })

    }
  }
  async UpdatePhiship()
  {
    this.Khoangcach = await this._ThanhtoanService.getPhiship(this.Donhang.Khachhang.Diachi)
    if(this.Khoangcach.status=="ZERO_RESULTS")
    {
      this._snackBar.open('Không tìm được khoảng cách','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'danger',
        duration: 1000,
      });
    }
    else
    {
      if(this.Khoangcach.distance.value<=2000)
      {
        this.Donhang.Phivanchuyen = 18000
      }
      else
      {
        this.Donhang.Phivanchuyen = ((((this.Khoangcach.distance.value-2000)/1000)*5000) + 18000);
      }
      console.log(this.Khoangcach);  
    }
 
  }

}
