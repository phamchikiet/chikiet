import { DecimalPipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { GiohangService } from '../giohang/giohang.service';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { NotifierService } from 'angular-notifier';
import { ListNotifyType } from 'fe_shop/src/app/shared/shared.utils';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SendemailService } from 'fe_shop/src/app/sendemail/sendemail-admin/sendemail.service';
import { SlideSanphamComponent } from '../slide-sanpham/slide-sanpham.component';
import { DiachiAdminComponent } from '../../../diachi/diachi-admin/diachi-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { ThanhtoanService } from './thanhtoan.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import html2canvas from 'html2canvas';
import {Base64} from 'js-base64';
import { ForminAdminComponent } from 'fe_shop/src/formin/formin-admin/formin-admin.component';
import { UploadService } from 'fe_shop/src/app/shared/upload.service';
import { CauhinhService } from 'fe_shop/src/app/cauhinh/cauhinh.service';
import { TelegramService } from 'fe_shop/src/app/shared/telegram.service';
import * as moment from 'moment';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-thanhtoan',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    MatRadioModule,
    SlideSanphamComponent,
    DiachiAdminComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    ForminAdminComponent,
    MatDialogModule
  ],
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent implements OnInit {

  _GiohangService: GiohangService = inject(GiohangService)
  _NotifierService: NotifierService = inject(NotifierService)
  _SendemailService: SendemailService = inject(SendemailService)
  _ThanhtoanService: ThanhtoanService = inject(ThanhtoanService)
  _CauhinhService: CauhinhService = inject(CauhinhService)
  _UploadService: UploadService = inject(UploadService)
  _TelegramService: TelegramService = inject(TelegramService)
  Khoangcach: any = {}
  ListNotifyType: any = ListNotifyType
  Notify: any = {}
  Donhang: any = {}
  Diachis: any[] = []
  ImageLink:any=''
  CauhinhEmail:any={}
  isThanhtoan:boolean = false
  @ViewChild('HinhthucTeamplate') HinhthucTeamplate!: TemplateRef<any>;
  constructor(
    private _snackBar: MatSnackBar,
    private dialog:MatDialog,
    ) { }
  ngOnInit() {
    this._GiohangService.getDonhang()
    this._GiohangService.donhang$.subscribe((data: any) => {
      this.Donhang = data
      this.Donhang.Thanhtoan.Hinhthuc ='BANK'
      this.Donhang.Total = data.SubTotal + Number(data.Vanchuyen.Phivanchuyen||0) - Number(data.Giamgia||0) + this.GetTotal(data.Giohangs, 'Thue', '')||0 
    })
    this._CauhinhService.getCauhinhBySlug('cau-hinh-email')
    this._CauhinhService.cauhinh$.subscribe((data)=>
    {
      if(data){
      this.CauhinhEmail = data.Dulieu
      console.log(data);
      }
    })
  }
  GetDiachi(value: any) {
    this.Donhang.Diachis = value
    const Diachi = value.find((v: any) => v.Active == true)
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
    return this.Donhang.Total + Number(this.Donhang.Vanchuyen.Phivanchuyen||0) - this.Donhang.Giamgia + this.GetTotal(this.Donhang.Giohangs, 'Thue', '')
  }
  ChooseMethod(item:any)
  {
    this.Donhang.Thanhtoan.Hinhthuc = item     
  }
  // async captureImage() {
  //   const element = document.getElementById('capturable-div') as HTMLElement;
  //   const canvas = await html2canvas(element);
  //   const imageData = canvas.toDataURL('image/png'); // Change format as needed (jpeg, etc.)
  //   // const formData = new FormData();
  //   // formData.append('file',  Base64.encode(imageData.replace('data:image/png;base64,', '')););
  //  //  this.ImageLink = await this._UploadService.uploadDonhang(imageData)

  //   console.log(this.ImageLink);


  // //   this.http.post(this.uploadUrl, imageDataToSend)
  // //     .subscribe(response => {
  // //       console.log('Image uploaded successfully!', response);
  // //     }, error => {
  // //       console.error('Error uploading image:', error);
  // //     });
  // // });
  // }
  async Xacnhandonhang(customSnackbar: TemplateRef<any>) {   

    // this.Donhang.Khachhang.Hoten="text"
    // this.Donhang.Khachhang.SDT="0987654321"
    // this.Donhang.Khachhang.Diachi="dfgdfgdf"

    
    if (!this.Donhang.Khachhang.Hoten) {
      this.Notify.Noidung = "Vui Lòng Nhập Họ Tên"
      this.Notify.type = "danger"
      this._snackBar.openFromTemplate(customSnackbar, {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: "danger",
        duration: 2000,
      });
    }
    // else if(!this.Donhang.Khachhang.Email)
    // {
    //   this._snackBar.open('Vui Lòng Nhập Email','',{
    //     horizontalPosition: "end",
    //     verticalPosition: "top",
    //     panelClass:'danger',
    //     duration: 2000,
    //   });
    // }
    else if (!this.Donhang.Khachhang.Diachi) {
      this.Notify.Noidung = "Vui Lòng Nhập Địa Chỉ"
      this.Notify.type = "danger"
      this._snackBar.openFromTemplate(customSnackbar, {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: "danger",
        duration: 2000,
      });
    }
    else if (!this.Donhang.Khachhang.SDT) {
      this.Notify.Noidung = "Vui Lòng Nhập Số Điện Thoại"
      this.Notify.type = "danger"
      this._snackBar.openFromTemplate(customSnackbar, {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: "danger",
        duration: 2000,
      });
    }
    else if(this.isThanhtoan==false)
    {
      this._snackBar.open('Vui lòng xác nhận thông tin giao hàng','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'danger',
        duration: 2000,
      });
    }
    else if (!this.Donhang.Hinhthuc) {

      const dialogRef = this.dialog.open(this.HinhthucTeamplate);
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
      const htmlteamplate= `<!doctype html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <h1 class="text-3xl font-bold underline bg-yellow-500">
           CẢM ƠN BẠN ĐÃ ĐẶT HÀNG
        </h1>
       <p> Đơn hàng của bạn đã được tiếp nhận sẽ được xử lý trong thời gian sớm nhất có thể </p>
       <p> Bạn có thể tra cứu đơn hàng ${this.Donhang.MaDonHang} <a href="https://shop.rausachtrangia.com/tra-cuu-don?MaDonHang=${this.Donhang.MaDonHang}">tại đây</> </p>
      </body>
      </html>`

      this._GiohangService.CreateDonhang(this.Donhang).then((data:any)=>
      {        
        if(data.error!==1001)
        {
          if(this.Donhang.Khachhang.Email)
          {
            this.CauhinhEmail.subject = `Xác Nhận Đơn Hàng ${data.MaDonHang}`
            this.CauhinhEmail.toemail = this.Donhang.Khachhang.Email
            this.CauhinhEmail.text = htmlteamplate
            this._SendemailService.SendEmail(this.CauhinhEmail)
            const Telegram = `Xác Nhận Đơn Hàng <a href="https://shop.rausachtrangia.com/tra-cuu-don?MaDonHang=${data.MaDonHang}">${data.MaDonHang}</a> đã đặt lúc ${moment().format("HH:mm:ss DD/MM/YYYY")}`
            this._TelegramService.SendNoti(Telegram).then(()=>
            {
              this._GiohangService.clearCart()
              setTimeout(() => {
                this._snackBar.open('Đặt Hàng Thành Công','',{
                  horizontalPosition: "end",
                  verticalPosition: "top",
                  panelClass:'success',
                  duration: 2000,
                });
                window.location.href = `cam-on?MaDonHang=${data.MaDonHang}`;
              }, 1000);
            })    
            }
            else{
            const Telegram = `Xác Nhận Đơn Hàng <a href="https://shop.rausachtrangia.com/tra-cuu-don?MaDonHang=${data.MaDonHang}">${data.MaDonHang}</a> đã đặt lúc ${moment().format("HH:mm:ss DD/MM/YYYY")}`
            this._TelegramService.SendNoti(Telegram).then(()=>
            {
              this._GiohangService.clearCart()
              setTimeout(() => {
                this._snackBar.open('Đặt Hàng Thành Công','',{
                  horizontalPosition: "end",
                  verticalPosition: "top",
                  panelClass:'success',
                  duration: 2000,
                });
                window.location.href = `cam-on?MaDonHang=${data.MaDonHang}`;
              }, 1000);
            })    
            }

        }
        else {
          this._GiohangService.clearCart()
          const Telegram = `Tạo trùng đơn hàng ${this.Donhang.MaDonHang}`
          this._TelegramService.SendNoti(Telegram).then(()=>{
            setTimeout(() => {
              window.location.href = `/`;
            }, 1000);
          })
        }


      })
        }
      });

    }

    // else {      
    //   const htmlteamplate= `<!doctype html>
    //   <html>
    //   <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <script src="https://cdn.tailwindcss.com"></script>
    //   </head>
    //   <body>
    //     <h1 class="text-3xl font-bold underline bg-yellow-500">
    //        CẢM ƠN BẠN ĐÃ ĐẶT HÀNG
    //     </h1>
    //    <p> Đơn hàng của bạn đã được tiếp nhận sẽ được xử lý trong thời gian sớm nhất có thể </p>
    //    <p> Bạn có thể tra cứu đơn hàng ${this.Donhang.MaDonHang} <a href="https://shop.chikiet.com/tra-cuu-don?MaDonHang=${this.Donhang.MaDonHang}">tại đây</> </p>
    //   </body>
    //   </html>`

    //   this._GiohangService.CreateDonhang(this.Donhang).then((data:any)=>
    //   {        
    //     if(data.error!==1001)
    //     {
    //       if(this.Donhang.Khachhang.Email)
    //       {
    //         this.CauhinhEmail.subject = `Xác Nhận Đơn Hàng ${data.MaDonHang}`
    //         this.CauhinhEmail.toemail = this.Donhang.Khachhang.Email
    //         this.CauhinhEmail.text = htmlteamplate
    //         this._SendemailService.SendEmail(this.CauhinhEmail)
    //         const Telegram = `Xác Nhận Đơn Hàng <a href="https://shop.chikiet.com/tra-cuu-don?MaDonHang=${data.MaDonHang}">${data.MaDonHang}</a> đã đặt lúc ${moment().format("HH:mm:ss DD/MM/YYYY")}`
    //         this._TelegramService.SendNoti(Telegram).then(()=>
    //         {
    //           this._GiohangService.clearCart()
    //           setTimeout(() => {
    //             this._snackBar.open('Đặt Hàng Thành Công','',{
    //               horizontalPosition: "end",
    //               verticalPosition: "top",
    //               panelClass:'success',
    //               duration: 2000,
    //             });
    //             window.location.href = `cam-on?MaDonHang=${data.MaDonHang}`;
    //           }, 100);
    //         })    
    //         }
    //         else{
    //           setTimeout(() => {
    //             window.location.href = `cam-on?MaDonHang=${data.MaDonHang}`;
    //           }, 10);
    //         }

    //     }
    //     else {
    //       setTimeout(() => {
    //         window.location.href = `/`;
    //       }, 1000);
    //     }


    //   })
    // }
  }
  async UpdatePhiship() {    
    if (this.Donhang.Khachhang.Diachi==undefined||this.Donhang.Khachhang.Diachi == '') {
      this._snackBar.open('Vui lòng nhập đại chỉ', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'warning',
        duration: 1000,
      });
    }
    else {
      this.Khoangcach = await this._ThanhtoanService.getPhiship(this.Donhang.Khachhang.Diachi)
      if (this.Khoangcach.status == "ZERO_RESULTS") {
        this._snackBar.open('Không tìm được khoảng cách', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'danger',
          duration: 1000,
        });
      }
      else {
        if (this.Khoangcach.distance.value <= 4000) {
          this.Donhang.Vanchuyen.Phivanchuyen = 20000
          this.Donhang.Vanchuyen.value = this.Khoangcach.distance.value
          this.Donhang.Vanchuyen.text = this.Khoangcach.distance.text
          this._GiohangService.getDonhang()
          this._snackBar.open('Đã Cập Nhật Phí Ship', '', {
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: 'success',
            duration: 1000,
          });
          this.isThanhtoan = true
        }
        else {
          this.Donhang.Vanchuyen.Phivanchuyen = (this.Khoangcach.distance.value* 5);
          // this.Donhang.Vanchuyen.Phivanchuyen = ((((this.Khoangcach.distance.value - 2000) / 1000) * 5000) + 18000);
          this.Donhang.Vanchuyen.value = this.Khoangcach.distance.value
          this.Donhang.Vanchuyen.text = this.Khoangcach.distance.text
          this._GiohangService.getDonhang()
          this._snackBar.open('Đã Cập Nhật Phí Ship', '', {
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: 'success',
            duration: 1000,
          });
          this.isThanhtoan = true
        }
      }
    }

  }

}
