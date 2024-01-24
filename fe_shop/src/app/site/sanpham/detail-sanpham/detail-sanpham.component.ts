import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'fe_shop/src/app/admin/main-admin/sanpham/sanpham.service';
import { GiohangService } from 'fe_shop/src/app/admin/main-admin/website/giohang/giohang.service';
import { SlideSanphamComponent } from 'fe_shop/src/app/admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-detail-sanpham',
  standalone:true,
  imports:[
    DecimalPipe,
    SlideSanphamComponent,
    ImageModule,
    FormsModule
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
  route: ActivatedRoute = inject(ActivatedRoute);
  Detail:any
  Giachon:any={}
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  Slug:any
  Soluong:any=1
  constructor() { 
    this.Slug = this.route.snapshot.params['slug'];
  }

  async ngOnInit() {
    if(this.Slug)
    {
      this.Detail = await this._SanphamService.getSanphamBySlug(this.Slug)
      this.Giachon = this.Detail.Giagoc[0]
      console.log(this.Detail);
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
  }
  GiamSoluong()
  {
    return this.Soluong>1?this.Soluong--:1
  }

}
