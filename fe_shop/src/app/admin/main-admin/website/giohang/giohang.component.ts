import { Component, OnInit, inject } from '@angular/core';
import { GiohangService } from './giohang.service';
import { DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { ChuongtrinhkhuyenmaiAdminService } from '../../admin-chuongtrinhkhuyenmai/admin-chuongtrinhkhuyenmai.service';
import { SlideSanphamComponent } from '../slide-sanpham/slide-sanpham.component';

@Component({
  selector: 'app-giohang',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    SlideSanphamComponent
  ],
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css']
})
export class GiohangComponent implements OnInit {
  _GiohangService: GiohangService = inject(GiohangService)
  _ChuongtrinhkhuyenmaiAdminService: ChuongtrinhkhuyenmaiAdminService = inject(ChuongtrinhkhuyenmaiAdminService)
  Donhang: any ={ Giohangs: [],Khachhang:{},Thanhtoan:{},Vanchuyen:{} }
  constructor(private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this._GiohangService.getDonhang()
    this._GiohangService.donhang$.subscribe((data: any) => {
      if(data)
      {
        this.Donhang = data
        this.Donhang.Total = data.SubTotal + Number(data.Vanchuyen.Phivanchuyen||0) - Number(data.Giamgia||0) + this.GetTotal(data.Giohangs, 'Thue', '')||0 
      }
    })
  }

  GetTotal(data: any, field: any, field1: any) {
    if (field1) {
      return data?.reduce((acc: any, item: any) => acc + item[field] * item[field1]?.gia, 0) || 0;
    }
    else {
      return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
    }
  }
  GetTongcong() {
    console.log(this.Donhang.SubTotal);
    return this.Donhang.SubTotal||0 + this.Donhang.Vanchuyen.Phivanchuyen||0 - this.Donhang.Giamgia||0 + this.GetTotal(this.Donhang.Giohangs, 'Thue', '')||0
  }
  DeleteCart()
  {
    this._GiohangService.clearCart()
  }
  RemoveFromCart(item:any)
  {
    this._GiohangService.removeFromCart(item).then(()=>
    {
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }
  Increment(item:any)
  {
    item.Soluong = Number(item.Soluong)+1
    this._GiohangService.Crement(item).then(()=>
    {
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
  }
  Decrement(item:any)
  {
    if(item.Soluong>1)
    {
    item.Soluong = Number(item.Soluong)-1
    this._GiohangService.Crement(item).then(()=>
    {
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 1000,
      });
    })
    }
  }
  async ApdungKhuyenmai()
  {
    const Khuyenmai = await this._ChuongtrinhkhuyenmaiAdminService.getChuongtrinhkhuyenmaiByCode(this.Donhang.Code)
    if(Khuyenmai)
    {

      this.Donhang.Khuyenmai = {id:Khuyenmai.id,Type:Khuyenmai.Type,Value:Khuyenmai.Value}
      this._GiohangService.UpdateDonhang(this.Donhang).then(()=>
      {
        this._snackBar.open('Áp Dụng Mã Khuyến Mãi','',{
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass:'success',
          duration: 1000,
        });  
      })

    }
    else{
      delete this.Donhang.Khuyenmai
      this.Donhang.Giamgia = 0
      this.Donhang.Code=''
      this._GiohangService.UpdateDonhang(this.Donhang)
      this._snackBar.open('Mã Khuyến Mãi Không Đúng','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'danger',
        duration: 1000,
      });
    }    
  }
}
