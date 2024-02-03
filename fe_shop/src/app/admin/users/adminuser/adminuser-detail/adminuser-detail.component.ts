import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AdminuserComponent } from '../adminuser.component';
@Component({
  selector: 'app-adminuser-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    AdminuserComponent
  ],
  templateUrl: './adminuser-detail.component.html',
  styleUrls: ['./adminuser-detail.component.css']
})
export class AdminuserDetailComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _AdminuserComponent: AdminuserComponent = inject(AdminuserComponent);
  idSP:any;
  constructor() {
      this.idSP = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    console.log(this.idSP);
  }
  CloseDrawer()
  {
    this._AdminuserComponent.drawer.close()
  }

}
