import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-site',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './footer-site.component.html',
  styleUrls: ['./footer-site.component.css']
})
export class FooterSiteComponent implements OnInit {
  Dangonline:any=(Math.random()*100).toFixed()
  Homnay:any=(Math.random()*2000).toFixed()
  Homqua:any=(Math.random()*3000).toFixed()
  Tongcong:any=Number(this.Dangonline)+Number(this.Homnay)+Number(this.Homqua)
  constructor() { }

  ngOnInit() {
  }

}
