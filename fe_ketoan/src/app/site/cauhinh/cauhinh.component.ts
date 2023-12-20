import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CauhinhService } from './cauhinh.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-cauhinh',
  standalone:true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.css']
})
export class CauhinhComponent implements OnInit {
  _HoadonbanraService: CauhinhService = inject(CauhinhService);
  ListBanra:any
  constructor() { }
  ngOnInit() {
    this._HoadonbanraService.getListBanra()
    this.ListBanra = this._HoadonbanraService.banras$.pipe(first()).subscribe();
    console.log(this.ListBanra);
    
  }

}
