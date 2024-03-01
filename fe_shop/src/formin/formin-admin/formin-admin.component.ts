import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formin-admin',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './formin-admin.component.html',
  styleUrls: ['./formin-admin.component.css']
})
export class ForminAdminComponent implements OnInit {
  @Input() Donhang:any ={}
  @Input() Tongthucte:any =0
  @Input() Taikhoan:any ={STK:'9199217',TenTK:"TRAN HUU LANH",TenNH:"Ngân hàng TMCP Á Châu (ACB)"}
  
  constructor() { }

  ngOnInit() {
    console.log(this.Donhang);
    console.log(this.Tongthucte);
    
  }

}
