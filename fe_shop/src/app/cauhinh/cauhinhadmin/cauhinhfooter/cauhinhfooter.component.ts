import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cauhinhfooter',
  standalone:true,
  imports:[
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './cauhinhfooter.component.html',
  styleUrls: ['./cauhinhfooter.component.css']
})
export class CauhinhfooterComponent implements OnInit {

  constructor() { }
  Today:any= new Date()
  Footer:any[]=[
    {id:1,Group:'Lienhe',Title:'CTY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA',Slug:'#',Ordering:'',Class:'text-[16px] text-[#65b009]'},
    {id:2,Group:'Lienhe',Title:'Địa chỉ: Tầng 3, Tòa nhà An Phú Plaza, 117-119 Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, TPHCM',Slug:'#',Ordering:''},
    {id:3,Group:'Lienhe',Title:'Điện thoại: 0865770009',Slug:'#',Ordering:''},
    {id:4,Group:'Lienhe',Title:'Hotline: 0865770009',Slug:'#',Ordering:''},
    {id:5,Group:'Lienhe',Title:'Email: rausachtrangia@gmail.com',Slug:'#',Ordering:''},
    {id:6,Group:'Vechungtoi',Title:'GIỚI THIỆU',Slug:'#',Ordering:''},
    {id:7,Group:'Vechungtoi',Title:'KHUYẾN MÃI',Slug:'#',Ordering:''},
    {id:8,Group:'Vechungtoi',Title:'MÓN NGON MỖI NGÀY',Slug:'#',Ordering:''},
    {id:9,Group:'Vechungtoi',Title:'TIN TỨC',Slug:'#',Ordering:''},
    {id:10,Group:'Vechungtoi',Title:'LIÊN HỆ',Slug:'#',Ordering:''},
    {id:11,Group:'Vechungtoi',Title:'',Slug:'#',Ordering:''},
    {id:12,Group:'Vechungtoi',Title:'',Slug:'#',Ordering:''},
    {id:13,Group:'Vechungtoi',Title:'',Slug:'#',Ordering:''},
    {id:14,Group:'Chinhsachquydinh',Title:'Cung cấp rau củ quả sỉ số lượng lớn',Slug:'#',Ordering:''},
    {id:15,Group:'Chinhsachquydinh',Title:'Cung cấp rau cho nhà hàng',Slug:'#',Ordering:''},
    {id:16,Group:'Chinhsachquydinh',Title:'Rau củ quả sạch',Slug:'#',Ordering:''},
    {id:17,Group:'Chinhsachquydinh',Title:'Cung cấp rau cho siêu thị - Cửa hàng',Slug:'#',Ordering:''},
    {id:18,Group:'Chinhsachquydinh',Title:'Giao rau tận nhà - Giá tại vườn',Slug:'#',Ordering:''},
    {id:19,Group:'Chinhsachquydinh',Title:'Cung cấp rau củ quả sạch xuất khẩu',Slug:'#',Ordering:''},
    {id:20,Group:'Chinhsachquydinh',Title:'Bán rau sạch',Slug:'#',Ordering:''},
    {id:21,Group:'Thongketruycap',Title:'Đang truy cập',Slug:'#',Ordering:''},
    {id:22,Group:'Thongketruycap',Title:'Hôm nay',Slug:'#',Ordering:''},
    {id:23,Group:'Thongketruycap',Title:'Trong tháng',Slug:'#',Ordering:''},
    {id:24,Group:'Thongketruycap',Title:'Tổng truy cập',Slug:'#',Ordering:''},
  ]
  @Input() Dulieu:any
  @Output() UploadDulieu = new EventEmitter();
  Detail:any[]=[]
  ngOnInit() {
    console.log(this.Dulieu);
    
  }
  UpdateDulieu()
  {
    this.UploadDulieu.emit(this.Dulieu);
  }
  FilterFooter(items:any[],field:any,value:any)
  {
    return items.filter((v:any)=>v[field]==value)
  }
}
