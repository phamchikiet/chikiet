import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CauhinhService } from './cauhinh.service';
import { tap, filter, first } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cauhinh',
  standalone:true,
  imports: [CommonModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.css']
})
export class CauhinhComponent implements OnInit {
  _HoadonbanraService: CauhinhService = inject(CauhinhService);
  ListBanra:any[]=[]
  Thang:any
  State:any
  constructor() { }
  ngOnInit() {

  }
  LoadListBanra()
  {
    this._HoadonbanraService.getListBanra(this.Thang,this.State)
    this._HoadonbanraService.banras$.pipe(
      tap(data => console.log(data)),
      filter(data => !!data),
      first()
    ).subscribe((data:any)=> this.ListBanra = data);
  }

}
