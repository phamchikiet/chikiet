import { Component, OnInit, inject } from '@angular/core';
import { LienheAdminService } from '../../admin-lienhe/admin-lienhe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  Detail:any={}
  _LienheAdminService:LienheAdminService = inject(LienheAdminService)
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  CreateLienhe() {
    this.Detail.Type={Title:'Form Liên Hệ',Slug:'form-lien-he'}
    this._LienheAdminService.CreateLienheAdmin(this.Detail).then(()=>
    {
      this.Detail={}
      this._snackBar.open('Gửi Thành Công','',{
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass:'success',
        duration: 2000,
      });
    })
  }

}
