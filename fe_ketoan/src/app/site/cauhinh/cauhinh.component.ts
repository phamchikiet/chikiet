import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-cauhinh',
  standalone:true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './cauhinh.component.html',
  styleUrls: ['./cauhinh.component.css']
})
export class CauhinhComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
