import { Component, Inject, Input, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogComponent, DynamicDialogRef, } from 'primeng/dynamicdialog';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-sanpham-chitiet',
  standalone:true,
  imports:[
    InputTextModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './sanpham-chitiet.component.html',
  styleUrls: ['./sanpham-chitiet.component.css']
})
export class SanphamChitietComponent implements OnInit {
  Sanpham:any={};
  instance: DynamicDialogComponent | undefined;
  constructor(public ref: DynamicDialogRef, private dialogService: DialogService) {
    this.instance = this.dialogService.getInstance(this.ref);
}

  ngOnInit() {
    console.log(this.Sanpham);
    if (this.instance && this.instance.data) {
      this.Sanpham = this.instance.data['Sanpham'];
      console.log(this.Sanpham);
      
    }
  }

}
