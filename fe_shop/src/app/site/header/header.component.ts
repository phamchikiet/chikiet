import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, effect, inject, signal } from '@angular/core';
import { AppService } from '../../app.service';
import { MatMenuModule } from '@angular/material/menu';
import { MainComponent } from '../main/main.component';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    RouterLinkActive,
    MatBadgeModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  _AppService: AppService = inject(AppService);
  _MainComponent: MainComponent = inject(MainComponent);
  darkmode: boolean = false
  Menus: any[] = [
    // {
    //   id: 1, Title: 'Trang Chủ', Slug: 'trang-chu',
    // },
    {
      id: 2, Title: 'Sản Phẩm', Slug: 'san-pham',
      children: [
        { id: 101, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 102, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 103, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 104, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 105, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 106, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 107, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 108, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 109, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 110, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
        { id: 111, Title: 'CÁC LOẠI CỦ', Slug: 'trang-chu' },
      ]
    },
    { id: 3, Title: 'Khuyến Mãi', Slug: 'lien-he' },
    { id: 4, Title: 'Món Ngon Mỗi Ngày', Slug: 'lien-he' },
    { id: 5, Title: 'Tin tức', Slug: 'lien-he' },
    {
      id: 3, Title: 'Về chúng tôi ', Slug: 'lien-he',
      children: [
        { id: 101, Title: ' Giới Thiệu Chun', Slug: 'trang-chu' },
        { id: 102, Title: 'Qui Trình', Slug: 'trang-chu' },
        { id: 103, Title: 'Hỏi Đáp', Slug: 'trang-chu' },
        { id: 104, Title: 'Tuyển Dụng', Slug: 'trang-chu' },
      ]
    },
    { id: 3, Title: 'Liên hệ', Slug: 'lien-he' },
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