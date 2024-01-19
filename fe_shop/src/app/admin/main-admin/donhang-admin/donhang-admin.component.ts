import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donhang-admin',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './donhang-admin.component.html',
  styleUrls: ['./donhang-admin.component.css']
})
export class DonhangAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
