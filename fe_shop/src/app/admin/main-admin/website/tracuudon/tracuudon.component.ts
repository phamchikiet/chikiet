import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tracuudon',
  standalone:true,
  templateUrl: './tracuudon.component.html',
  styleUrls: ['./tracuudon.component.css']
})
export class TracuudonComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }
  MaDonHang:any
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.MaDonHang = params['MaDonHang']
      console.log(params);
      
    });
  }

}
