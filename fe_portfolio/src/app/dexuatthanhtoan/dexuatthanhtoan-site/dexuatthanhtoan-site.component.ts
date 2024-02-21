import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../shared/localstorage.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-dexuatthanhtoan-site',
  standalone:true,
  imports:[
    MatIconModule,
    MatInputModule,
    MatCheckbox,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './dexuatthanhtoan-site.component.html',
  styleUrls: ['./dexuatthanhtoan-site.component.css']
})
export class DexuatthanhtoanSiteComponent implements OnInit {
  _LocalStorageService:LocalStorageService = inject(LocalStorageService)

  Detail:any=this._LocalStorageService.getItem('Detail')||{}
  isEdit:boolean=false
  constructor() { }

  ngOnInit() {
  }
  Luuthongtin()
  {
    this._LocalStorageService.setItem('Detail',this.Detail)
  }
  Reset()
  {
    this.Detail = {}
    this._LocalStorageService.setItem('Detail',this.Detail)
  }

}
