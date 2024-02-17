import { Component, OnInit, inject } from '@angular/core';
import { GiohangService } from './giohang.service';
import { DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-giohang',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css']
})
export class GiohangComponent implements OnInit {
  _GiohangService: GiohangService = inject(GiohangService)
  Donhang: any ={Giohangs:[]}
  Phivanchuyen: any = 10
  Giamgia: any = 30
  constructor(private _snackBar: MatSnackBar) { }
  ngOnInit() {
    this._GiohangService.getDonhang()
    this._GiohangService.donhang$.subscribe((data: any) => {
      if(data)
      {
        this.Donhang = data
        console.log(data);
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
    return this.GetTotal(this.Donhang.Giohangs, 'Soluong', 'Giachon') + this.Phivanchuyen + this.Giamgia + this.GetTotal(this.Donhang.Giohangs, 'Thue', '')
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
        duration: 2000,
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
        duration: 2000,
      });
    })
  }
  Decrement(item:any)
  {
    console.log(item);
    if(item.Soluong>1)
    {
    item.Soluong = Number(item.Soluong)-1
    this._GiohangService.Crement(item).then(()=>
    {
      this._snackBar.open('Cập Nhật Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 2000,
      });
    })
    }
  }
}
