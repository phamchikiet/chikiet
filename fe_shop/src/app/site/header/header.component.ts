import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, effect, inject, signal } from '@angular/core';
import { AppService } from '../../app.service';
import { MatMenuModule } from '@angular/material/menu';
import { MainComponent } from '../main/main.component';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
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
  _DanhmucService: DanhmucService = inject(DanhmucService);
  darkmode: boolean = false
  Danhmucs:any[]=[]
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
    { id: 3, Title: 'Khuyến Mãi', Slug: 'khuyen-mai' },
    { id: 4, Title: 'Món Ngon Mỗi Ngày', Slug: 'mon-ngon-moi-ngay' },
    { id: 5, Title: 'Tin tức', Slug: 'tin-tuc' },
    {
      id: 3, Title: 'Về chúng tôi ', Slug: 've-chung-toi',
      children: [
        { id: 101, Title: 'Giới Thiệu Chun', Slug: 'gioi-thieu-chung' },
        { id: 102, Title: 'Qui Trình', Slug: 'quy-trinh' },
        { id: 103, Title: 'Hỏi Đáp', Slug: 'hoi-dap' },
        { id: 104, Title: 'Tuyển Dụng', Slug: 'tuyen-dung' },
      ]
    },
    { id: 3, Title: 'Liên hệ', Slug: 'lien-he' },
  ]
  constructor() {
    this._AppService.isDarkTheme$.subscribe(isDarkTheme => {
      document.body.classList.toggle('dark', isDarkTheme);
    });
  }
  async ngOnInit(): Promise<void> {
    this.Danhmucs = await this._DanhmucService.SearchDanhmuc('')
    console.log(this.Danhmucs);
    
  }

  toggleTheme() {
    this._AppService.toggleTheme();
  }
  toggleDrawer() {
    this._MainComponent.drawer.toggle()
  }


}
