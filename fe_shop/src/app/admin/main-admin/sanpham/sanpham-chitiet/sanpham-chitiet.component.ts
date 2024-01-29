import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SanphamComponent } from '../sanpham.component';
@Component({
  selector: 'app-sanpham-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    SanphamComponent
  ],
  templateUrl: './sanpham-chitiet.component.html',
  styleUrls: ['./sanpham-chitiet.component.css']
})
export class SanphamChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _SanphamComponent: SanphamComponent = inject(SanphamComponent);
  idSP:any;
  constructor() {
      this.idSP = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    console.log(this.idSP);
  }
  CloseDrawer()
  {
    this._SanphamComponent.drawer.close()
  }

}