import { Component, OnInit } from '@angular/core';
import { HeaderSiteComponent } from '../../header/header-site/header-site.component';
import { FooterSiteComponent } from '../../footer/footer-site/footer-site.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-site',
  standalone:true,
  imports:[
    HeaderSiteComponent,
    FooterSiteComponent,
    RouterOutlet
  ],
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.css']
})
export class MainSiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
