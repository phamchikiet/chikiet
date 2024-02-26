import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'fe_shop/src/app/admin/main-admin/sanpham/sanpham.service';
import { GiohangService } from 'fe_shop/src/app/admin/main-admin/website/giohang/giohang.service';
import { SlideSanphamComponent } from 'fe_shop/src/app/admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { ImageModule } from 'primeng/image';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { ListNotifyType } from 'fe_shop/src/app/shared/shared.utils';
import { TonkhoAdminService } from 'fe_shop/src/app/admin/main-admin/admin-xnt/admin-tonkho/admin-tonkho.service';
import Swiper, { Pagination } from 'swiper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-detail-sanpham',
  standalone:true,
  imports:[
    DecimalPipe,
    SlideSanphamComponent,
    ImageModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './detail-sanpham.component.html',
  styleUrls: ['./detail-sanpham.component.css']
})
export class DetailSanphamComponent implements OnInit {
  responsiveOptions: any[] = [
    {
        breakpoint: '1500px',
        numVisible: 5
    },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  _SanphamService: SanphamService = inject(SanphamService);
  _GiohangService: GiohangService = inject(GiohangService);
  _TonkhoAdminService: TonkhoAdminService = inject(TonkhoAdminService);
  route: ActivatedRoute = inject(ActivatedRoute);
  Detail:any
  Tonkho:any
  Notify:any
  Giachon:any={}
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  Slug:any
  Soluong:any=1
  ListNotifyType:any=ListNotifyType
  constructor(
    private _snackBar: MatSnackBar,
    private dialog:MatDialog
    ) { 
    this.Slug = this.route.snapshot.params['slug'];

  }

  async ngOnInit() {
    if(this.Slug)
    {
     this._SanphamService.getSanphamBySlug(this.Slug)
     this._SanphamService.sanpham$.subscribe(async (data)=>{
      if(data){ 
        this.Detail = data
        this.Giachon = this.Detail.Giagoc[0]
        this.Tonkho =  await this._TonkhoAdminService.getTonkhoByidSP(this.Detail.id)
        console.log(this.Detail);
      }
     })    
    }

  }
  GetListImages(data:any)
  {
    console.log(Object.entries(data));
    return Object.entries(data)
  }
  AddtoCart(data:any)
  {
    console.log(data);
    let item:any={}
    item = data
    item.Giachon = this.Giachon
    item.Soluong=this.Soluong   
    this._GiohangService.addToCart(item)
      this._snackBar.open("Thêm Vào Giỏ Hàng Thành Công","", {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:"success",
        duration: 1000,
      });
  }
  GiamSoluong()
  {
    return this.Soluong>1?this.Soluong--:1
  }
  ngAfterViewInit(): void {
    const swiper = new Swiper('.mySwiper', {
      modules: [Pagination],
      pagination: {
        el: '.swiper-pagination',
        clickable:true
      },
      navigation:true,
      slidesPerView:1,
      spaceBetween: 0,
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
    });
  }
  ZoomImage(teamplate: TemplateRef<any>): void {
    console.log("abcdef");
    
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
}
