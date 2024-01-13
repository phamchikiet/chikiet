import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, effect, inject, signal } from '@angular/core';
import { AppService } from '../../app.service';
import {MatMenuModule} from '@angular/material/menu';
import { MainComponent } from '../main/main.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone:true,
  imports:[
    CommonModule,
    MatMenuModule,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  _AppService: AppService = inject(AppService);
  _MainComponent: MainComponent = inject(MainComponent);
  darkmode:boolean=false
  Menus:any[]=[
    {id:1,Title:'Trang Chủ',Slug:'trang-chu'},
    {id:2,Title:'Giới Thiệu',Slug:'gioi-thieu'},
    {id:2,Title:'Sản Phẩm',Slug:'san-pham'},
    {id:3,Title:'Tin Tức',Slug:'tin-tuc'},
    {id:4,Title:'Liên Hệ',Slug:'lienhe'},
  ]
  constructor() {
    this._AppService.isDarkTheme$.subscribe(isDarkTheme => {
      document.body.classList.toggle('dark', isDarkTheme);
    });
  }
  ngOnInit(): void {
  }

  toggleTheme() {
    this._AppService.toggleTheme();
  }
  toggleDrawer() {
    this._MainComponent.drawer.toggle()
  }


}
