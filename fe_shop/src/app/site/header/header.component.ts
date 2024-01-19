import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit, effect, inject, signal } from '@angular/core';
import { AppService } from '../../app.service';
import { MatMenuModule } from '@angular/material/menu';
import { MainComponent } from '../main/main.component';
import {MatBadgeModule} from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DanhmucService } from '../../admin/main-admin/danhmuc/danhmuc.service';
import { OverlayModule } from '@angular/cdk/overlay';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    RouterLinkActive,
    MatBadgeModule,
    RouterLink,
    OverlayModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen = false;
  // isOpen:any = false;
  _AppService: AppService = inject(AppService);
  _MainComponent: MainComponent = inject(MainComponent);
  _DanhmucService: DanhmucService = inject(DanhmucService);
  SearchParams: any = {
    pageSize:10,
    pageNumber:0
  };
  darkmode: boolean = false
  Danhmucs:any={}
  Menus: any
  ListMenus: any[] = [
    {
      id: 2, Title: 'Sản Phẩm', Slug: 'san-pham',Show:false,
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
      id: 3, Title: 'Về chúng tôi ', Slug: 've-chung-toi',Show:false,
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
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  selectedOption: string = '';

  onSelect(option: string) {
    this.selectedOption = option;
  }
  async ngOnInit(): Promise<void> {
    this.Danhmucs = await this._DanhmucService.SearchDanhmuc(this.SearchParams)
    console.log(this.Danhmucs);
    this.Menus = this.ListMenus.forEach((v)=>
    {
      if(v.id==2)
      {
        v.children = this.Danhmucs.items
      }
    })
    console.log(this.Menus);
    
    
  }

  toggleTheme() {
    this._AppService.toggleTheme();
  }
  toggleDrawer() {
    this._MainComponent.drawer.toggle()
  }
  onMouseEnter(name: string) {
    console.log("mouse enter", name);
  }
  onMouseOut(name: string) {
    console.log("mouse out", name);
  }

}
