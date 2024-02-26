import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../shared/localstorage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { readMoney } from '../../shared/shared.utils';
@Component({
  selector: 'app-dexuatthanhtoan-site',
  standalone:true,
  imports:[
    MatIconModule,
    MatInputModule,
    MatCheckbox,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dexuatthanhtoan-site.component.html',
  styleUrls: ['./dexuatthanhtoan-site.component.css']
})
export class DexuatthanhtoanSiteComponent implements OnInit {
  _LocalStorageService:LocalStorageService = inject(LocalStorageService)
  @ViewChild('printArea') printAreaRef!: ElementRef;
  Detail:any=this._LocalStorageService.getItem('Detail')||{ListCongviec:[{id:1,Title:''}]}
  isEdit:boolean=false
  isPrint:any=''
  constructor() { }

  ngOnInit() {
    console.log(this.Detail);
  }
    printDiv() {
    const printArea = this.printAreaRef.nativeElement;
    console.log(printArea);
    const originalStyles = printArea.style.display;
    printArea.style.display = 'flex'; // Ensure visibility for printing
    printArea.style.margin = '0'; // Remove margins for full-page coverage
    printArea.style.padding = '0'; // Remove padding for full-page coverage
    window.print();
    printArea.style.display = originalStyles; // Restore original styles
  }
  // printDiv() {
  //   const printArea = this.printAreaRef.nativeElement;
  //   const clone = printArea.cloneNode(true);
  //   clone.style.display = 'block';
  //   clone.style.margin = '10px'; // Remove margins for full-page coverage
  //   clone.style.padding = '10px'; // Remove padding for full-page coverage
  //   clone.style.border = 'none';
  //   clone.style.fontSize = '16px';
  //   const body = document.body;
  //   body.append(clone);
  //   window.print();
  //   body.remove();
  // }
  Luuthongtin()
  {
    console.log(this.Detail);
    this.Detail.ListCongviec =  this.Detail.ListCongviec.filter((v:any)=>v.Title!==''&&v.Sotien!==''&&v.Ghichu!=='')
    this._LocalStorageService.setItem('Detail',this.Detail)
  }
  Reset()
  {
    this.Detail = {}
    this._LocalStorageService.setItem('Detail',this.Detail)
  }
  Subtotal(items:any[],field:any)
  {
    if(items.length>0)
    {
    const totalSum = items.reduce((total:any, item:any) => Number(total) + Number(item[field]), 0);
    return totalSum
    }
    else return 0
  }
  Tienbangchu(data:any)
  {        
    return readMoney(Number(data))
  }
  AddCongviec()
  {
    const item:any={id:this.Detail.ListCongviec.length+1,Title:''}
    this.Detail.ListCongviec.push(item)
  }
  CopyCongviec(data:any)
  {
    const item:any={id:this.Detail.ListCongviec.length+1,Title:data.Title}
    this.Detail.ListCongviec.push(item)
  }
  XoaCongviec(data:any)
  {
    this.Detail.ListCongviec = this.Detail.ListCongviec.filter((v:any)=>v.id!==data.id)
  }
  GetNgay()
  {
    const today = new Date(this.Detail.Ngaythang)
   return today.getDate()
  }
  GetThang()
  {
    const today = new Date(this.Detail.Ngaythang)
    return today.getMonth()+1
  }
  GetNam()
  {
    const today = new Date(this.Detail.Ngaythang)
    return today.getFullYear()
  }

}
