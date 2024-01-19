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
  Menus: any[] = [
    {
      id: 2, Title: 'Sản Phẩm', Slug: 'san-pham',Show:false,
      children: [
        {
            "id": "6edf43d3-db0a-4848-b8c9-fef7a110af7f",
            "id_cat": "230",
            "idDM": "",
            "Title": "CÁC LOAI NAM",
            "Mota": "",
            "Slug": "cac-loai-nam",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:20.302Z",
            "UpdateAt": "2024-01-17T17:00:20.302Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "5cae052d-407b-4cc7-a586-7d6908aa561d",
            "id_cat": "233",
            "idDM": "",
            "Title": "TRÁI CÂY CÁC LOAI",
            "Mota": "",
            "Slug": "trai-cay-cac-loai",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:20.202Z",
            "UpdateAt": "2024-01-17T17:00:20.202Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "2001617c-ddd6-4aa5-8bf8-7261feea43d8",
            "id_cat": "228",
            "idDM": "",
            "Title": "DAC SAN - RAU RUNG",
            "Mota": "",
            "Slug": "dac-san-rau-rung",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:20.102Z",
            "UpdateAt": "2024-01-17T17:00:20.102Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "52bcc61e-7e71-4dc9-ad21-66bcd55988ba",
            "id_cat": "227",
            "idDM": "",
            "Title": "RAU LAY BÔNG",
            "Mota": "",
            "Slug": "rau-lay-bong",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:20.002Z",
            "UpdateAt": "2024-01-17T17:00:20.002Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "2de7213a-5a39-44d1-b98f-77e3695d5a60",
            "id_cat": "226",
            "idDM": "",
            "Title": "CÁC LOAI OT",
            "Mota": "",
            "Slug": "cac-loai-ot",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:19.902Z",
            "UpdateAt": "2024-01-17T17:00:19.902Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "672ed51e-b804-497f-8db8-5b53e7609971",
            "id_cat": "224",
            "idDM": "",
            "Title": "CÁC LOAI RAU CAI",
            "Mota": "",
            "Slug": "cac-loai-rau-cai",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:19.801Z",
            "UpdateAt": "2024-01-17T17:00:19.801Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "222b02ad-039b-4afb-8290-49208f08f2a6",
            "id_cat": "222",
            "idDM": "",
            "Title": "RAU GIA VI - RAU SONG",
            "Mota": "",
            "Slug": "rau-gia-vi-rau-song",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:19.701Z",
            "UpdateAt": "2024-01-17T17:00:19.701Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "1a117cb6-f76b-4842-a215-121a8fb66431",
            "id_cat": "221",
            "idDM": "",
            "Title": "CÁC LOAI QUA",
            "Mota": "",
            "Slug": "cac-loai-qua",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:19.601Z",
            "UpdateAt": "2024-01-17T17:00:19.601Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "3342e817-d24c-4164-9d87-70783c17fe88",
            "id_cat": "220",
            "idDM": "",
            "Title": "CÁC LOAI CU",
            "Mota": "",
            "Slug": "cac-loai-cu",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:19.501Z",
            "UpdateAt": "2024-01-17T17:00:19.501Z",
            "DeleteAt": null,
            "idCreate": null
        },
        {
            "id": "726c162b-6f77-4366-9b14-aef70d9d72c8",
            "id_cat": "219",
            "idDM": "",
            "Title": "RAU AN THÂN - LÁ",
            "Mota": "",
            "Slug": "rau-an-than-la",
            "Image": {},
            "Type": "",
            "Ordering": 1,
            "Status": 0,
            "CreateAt": "2024-01-17T17:00:19.401Z",
            "UpdateAt": "2024-01-17T17:00:19.401Z",
            "DeleteAt": null,
            "idCreate": null
        }
    ]
    },
    { id: 3, Title: 'Khuyến Mãi', Slug: 'khuyen-mai' },
    { id: 4, Title: 'Món Ngon Mỗi Ngày', Slug: 'mon-ngon-moi-ngay' },
    { id: 5, Title: 'Tin tức', Slug: 'tin-tuc' },
    {
      id: 3, Title: 'Về chúng tôi ', Slug: 've-chung-toi',Show:false,
      children: [
        { id: 101, Title: 'Giới Thiệu Chung', Slug: 'gioi-thieu-chung' },
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
    console.log( this.Danhmucs);
    
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
