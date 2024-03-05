import { Component, Inject, Input, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DonhangAdminComponent } from '../donhang-admin.component';
import { GiohangService } from '../../website/giohang/giohang.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForminAdminComponent } from 'fe_shop/src/formin/formin-admin/formin-admin.component';
import { TimelineDonhangComponent } from 'fe_shop/src/app/shared/timeline-donhang/timeline-donhang.component';
import { ListHinhthucthanhtoan, ListTrangThaiDonhang } from 'fe_shop/src/app/shared/shared.utils';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { DiachiAdminComponent } from '../../../diachi/diachi-admin/diachi-admin.component';
import { UsersService } from '../../../users/auth/users.service';
import { TelegramService } from 'fe_shop/src/app/shared/telegram.service';
import * as moment from 'moment';
@Component({
  selector: 'app-donhang-admin-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    DonhangAdminComponent,
    MatDialogModule,
    ForminAdminComponent,
    TimelineDonhangComponent,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    DiachiAdminComponent
  ],
  templateUrl: './donhang-admin-chitiet.component.html',
  styleUrls: ['./donhang-admin-chitiet.component.css']
})
export class DonhangAdminChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _DonhangAdminComponent: DonhangAdminComponent = inject(DonhangAdminComponent);
  _GiohangService:GiohangService = inject(GiohangService)
  idSP:any;
  Detail:any;
  Giohangs: any[] = []
  ListTrangThaiDonhang:any=ListTrangThaiDonhang
  ListHinhthucthanhtoan:any=ListHinhthucthanhtoan
  @ViewChild('GhichuDialog') GhichuDialog!: TemplateRef<any>;
  @ViewChild('dialogXemFormin') dialogXemFormin!: TemplateRef<any>;
  _UsersService: UsersService = inject(UsersService)
  _TelegramService: TelegramService = inject(TelegramService)
  Profile: any = {}
  constructor(
     private dialog:MatDialog,
     private _snackBar: MatSnackBar,
     ) {
      this.idSP = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    this._UsersService.getProfile()
    this._UsersService.profile$.subscribe((data) => {
      if (data) {
        this.Profile = data
        this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==0||v.id==1||v.id==2)
        if(data.Role=="nhanvienkinhdoanh"){this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==1||v.id==2)}
        else if(data.Role=="nhanvienkho"){this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==3)}
        else if(data.Role=="nhanvienketoan"){this.ListTrangThaiDonhang = ListTrangThaiDonhang.filter((v:any)=>v.id==4)}
        else if(data.Role=="admin"){this.ListTrangThaiDonhang=ListTrangThaiDonhang}
        else {this.ListTrangThaiDonhang=[]}
      }
    })
    

    if(this.idSP)
    {
      this._GiohangService.getAdDonhangByid(this.idSP)
      this._GiohangService.addonhang$.subscribe((data)=>{
        if(data)
        {      
          console.log(data);
          
          this.Detail=data
          this.Giohangs = data.Giohangs.Sanpham
        }
      })
      this._DonhangAdminComponent.drawer.open()
    }

  }
  CloseDrawer()
  {
    this._DonhangAdminComponent.drawer.close()
  }
  GetSubTotal(data: any, field: any, field1: any) {    
    return this._GiohangService.getSum(data,field,field1)
  }
  GetSubTotalThucte(data: any, field: any, field1: any) {    
    const items = data.map((v:any)=>(v.Giachon))    
    return this._GiohangService.getSumThucte(items,field,field1)
  }
  GetTotalThucte(donhang:any,giohang:any,soluong:any,gia:any,thue:any)
  {    
    const result = (this.GetSubTotalThucte(giohang, soluong, gia) + Number(donhang.Vanchuyen.Phivanchuyen||0) + Number(donhang.Giamgia||0) + this.GetSubTotal(giohang, thue, ''))
    return result
  }
  GetTotal(donhang:any,giohang:any,soluong:any,gia:any,thue:any)
  {
    const result = (this.GetSubTotal(giohang, soluong, gia) + Number(donhang.Vanchuyen.Phivanchuyen||0) + Number(donhang.Giamgia||0) + this.GetSubTotal(giohang, thue, ''))
    return result
  }
  // GetTongcong() {
  //   return this.GetTotal(this.Giohangs, 'Soluong', 'Giachon') + this.Phivanchuyen + this.Giamgia + this.GetTotal(this.Giohangs, 'Thue', '')
  // }

  XemFormin(teamplate: TemplateRef<any>): void {    
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
  GetStatus(item:any,field:any)
  {
    const result = ListTrangThaiDonhang.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  GetHinhthucthanhtoan(item:any,field:any)
  {
    const result = ListHinhthucthanhtoan.find((v)=>v.id==item)
    if(result){return result[field]}
  }
  openGhichu(teamplate: TemplateRef<any>): void {
    console.log(teamplate);
    const dialogRef = this.dialog.open(teamplate, {});
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 'true') {
          this.Detail.Status=5
          this._GiohangService.UpdateDonhang(this.Detail).then(() => {
            this._snackBar.open('Cập Nhật Thành Công', '', {
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: 'success',
              duration: 1000,
            });
          })
        }
        else {
          this._snackBar.open('Đơn hàng chưa được huỷ do chưa nhập lý do.', '', {
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: 'danger',
            duration: 1000,
          });
        }
      });
  } 
  ChangeStatus(item: any, item1: any) {
    if(item1.id==5)
    {
      this.openGhichu(this.GhichuDialog)     
    }
    else{
      item.Status=item1.id
      this._GiohangService.UpdateDonhang(item).then((data) => {
      const telegram = `Đơn Hàng ${data.MaDonHang} được cập nhật ${data.Status} vào lúc ${moment().format("hh:ss:mm DD/MM/YYY")}`
      this._TelegramService.SendNoti(telegram)
        this._snackBar.open('Cập Nhật Thành Công', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'success',
          duration: 1000,
        });
      })
    }
  }
  ChangeHinhthucthanhtoan(item: any, item1: any) {
    console.log(item,item1);
    
      item.Thanhtoan.Hinhthuc=item1.id
      this._GiohangService.UpdateDonhang(item).then(() => {
        this._snackBar.open('Cập Nhật Thành Công', '', {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: 'success',
          duration: 1000,
        });
      })
  }
     Tanggiatri(index:any,field:any)
     {
      console.log(this.Detail.Giohangs.Sanpham[index]);
      
      if(this.Detail.Giohangs.Sanpham[index][field])
      {
        this.Detail.Giohangs.Sanpham[index][field] = Number(this.Detail.Giohangs.Sanpham[index][field])+1
      }
      else
      {
        this.Detail.Giohangs.Sanpham[index][field] = 1
      }
      
     }
     Giamgiatri(index:any,field:any)
     {
      console.log(index,field);
      
      if(this.Detail.Giohangs.Sanpham[index][field]&&this.Detail.Giohangs.Sanpham[index][field]>1)
      {
        this.Detail.Giohangs.Sanpham[index][field] = Number(this.Detail.Giohangs.Sanpham[index][field])-1
      }  
      else {
        this._snackBar.open('Số Lượng Không Được Âm','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'danger',
          duration: 1000,
        });
      }
     }
     TangTT(index:any,field:any)
     {
      if(this.Detail.Giohangs.Sanpham[index].Giachon[field])
      {
        this.Detail.Giohangs.Sanpham[index].Giachon[field] = Number(this.Detail.Giohangs.Sanpham[index].Giachon[field])+1
      }
      else
      {
        this.Detail.Giohangs.Sanpham[index].Giachon[field] = 1
      }
      
     }
     GiamTT(index:any,field:any)
     {
      console.log(index,field);
      
      if(this.Detail.Giohangs.Sanpham[index].Giachon[field]&&this.Detail.Giohangs.Sanpham[index].Giachon[field]>1)
      {
        this.Detail.Giohangs.Sanpham[index].Giachon[field] = Number(this.Detail.Giohangs.Sanpham[index].Giachon[field])-1
      }  
      else {
        this._snackBar.open('Số Lượng Không Được Âm','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'danger',
          duration: 1000,
        });
      }
     }
     GetDiachi(value: any) {
      this.Detail.Diachis = value
      const Diachi = value.find((v: any) => v.Active == true)
      this.Detail.Khachhang.Diachi = `${Diachi.Diachi ? Diachi.Diachi + ', ' : ''}${Diachi.Phuong ? Diachi.Phuong + ', ' : ''}${Diachi.Quan ? Diachi.Quan + ', ' : ''}${Diachi.Tinh || ''}`;
    }
}
