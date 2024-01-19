import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Thongkes:any[]=[
    {id:1,Title:'Danh Mục',Icon:'folder',Value:'11',Percent:'11%'},
    {id:2,Title:'Sản Phẩm',Icon:'description',Value:'163',Percent:'29%'},
    {id:3,Title:'Bài Viết',Icon:'nutrition',Value:'20',Percent:'45%'},
    {id:4,Title:'Liên Hệ', Icon:'chat',Value:'1385',Percent:'31%'}
  ]
  constructor() { }
  ngOnInit() {
  }

}
