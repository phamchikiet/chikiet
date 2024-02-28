import { Component, Inject, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DonhangAdminComponent } from '../donhang-admin.component';
import { GiohangService } from '../../website/giohang/giohang.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForminAdminComponent } from 'fe_shop/src/formin/formin-admin/formin-admin.component';
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
    DonhangAdminComponent,
    MatDialogModule,
    ForminAdminComponent
  ],
  templateUrl: './donhang-admin-chitiet.component.html',
  styleUrls: ['./donhang-admin-chitiet.component.css']
})
export class DonhangAdminChitietComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  _DonhangAdminComponent: DonhangAdminComponent = inject(DonhangAdminComponent);
  _GiohangService:GiohangService = inject(GiohangService)
  idSP:any;
  Detail:any;
  Giohangs: any[] = []
  Phivanchuyen: any = 10
  Giamgia: any = 30
  constructor( private dialog:MatDialog) {
      this.idSP = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    if(this.idSP)
    {
      this._GiohangService.getAdDonhangByid(this.idSP)
      this._GiohangService.addonhang$.subscribe((data)=>{
        if(data)
        {      
          console.log(data);
          this.Detail=data
          this.Giohangs = data.Giohangs.Sanpham
        }
      })
      this._DonhangAdminComponent.drawer.open()
    }

  }
  CloseDrawer()
  {
    this._DonhangAdminComponent.drawer.close()
  }
  GetTotal(data: any, field: any, field1: any) {
    if (field1) {
      return data?.reduce((acc: any, item: any) => acc + item[field] * item[field1]?.gia, 0) || 0;
    }
    else {
      return data?.reduce((acc: any, item: any) => acc + item[field], 0) || 0;
    }
  }
  GetTongcong() {
    return this.GetTotal(this.Giohangs, 'Soluong', 'Giachon') + this.Phivanchuyen + this.Giamgia + this.GetTotal(this.Giohangs, 'Thue', '')
  }

  XemFormin(teamplate: TemplateRef<any>): void {    
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe(() => {

    });
  }
}
