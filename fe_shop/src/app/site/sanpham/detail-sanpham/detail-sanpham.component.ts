import { DecimalPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SanphamService } from 'fe_shop/src/app/admin/main-admin/sanpham/sanpham.service';
import { SlideSanphamComponent } from 'fe_shop/src/app/admin/main-admin/website/slide-sanpham/slide-sanpham.component';
import { ImageModule } from 'primeng/image';
@Component({
  selector: 'app-detail-sanpham',
  standalone:true,
  imports:[
    DecimalPipe,
    SlideSanphamComponent,
    ImageModule,
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
  route: ActivatedRoute = inject(ActivatedRoute);
  Detail:any
  SearchParams: any = {
    pageSize:50,
    pageNumber:0
  };
  Slug:any
  constructor() { 
    this.Slug = this.route.snapshot.params['slug'];
  }

  async ngOnInit() {
    if(this.Slug)
    {
      this.Detail = await this._SanphamService.getSanphamBySlug(this.Slug)
      console.log(this.Detail);
    }

  }
  GetListImages(data:any)
  {
    console.log(Object.entries(data));
    
    return Object.entries(data)
  }

}
