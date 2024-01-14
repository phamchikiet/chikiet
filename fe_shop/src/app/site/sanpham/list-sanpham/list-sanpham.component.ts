import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-sanpham',
  standalone:true,
  imports:[RouterLink],
  templateUrl: './list-sanpham.component.html',
  styleUrls: ['./list-sanpham.component.css']
})
export class ListSanphamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
