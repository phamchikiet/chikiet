import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-site',
  standalone:true,
  imports:[
    CommonModule
  ],
  templateUrl: './header-site.component.html',
  styleUrls: ['./header-site.component.css']
})
export class HeaderSiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
