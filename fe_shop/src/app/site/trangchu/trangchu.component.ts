import { Component, OnInit } from '@angular/core';
import { BannerComponent } from '../../admin/main-admin/website/banner/banner.component';

@Component({
  selector: 'app-trangchu',
  standalone:true,
  imports:[BannerComponent],
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css']
})
export class TrangchuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
