import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DonhangAdminComponent } from '../donhang-admin.component';
import { GiohangService } from '../../website/giohang/giohang.service';
@Component({
  selector: 'app-donhang-admin-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    DonhangAdminComponent
  ],
  templateUrl: './donhang-admin-chitiet.component.html',
  styleUrls: ['./donhang-admin-chitiet.component.css']
})
export class DonhangAdminChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _DonhangAdminComponent: DonhangAdminComponent = inject(DonhangAdminComponent);
  _GiohangService:GiohangService = inject(GiohangService)
  idSP:any;
  Detail:any
  constructor() {
      this.idSP = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    this._GiohangService.getDonhangByid(this.idSP)
    this._GiohangService.donhang$.subscribe((data)=>{console.log(data);
      this.Detail=data
    })
  }
  CloseDrawer()
  {
    this._DonhangAdminComponent.drawer.close()
  }

}
