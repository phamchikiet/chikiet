import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-formin-admin',
  standalone:true,
  templateUrl: './formin-admin.component.html',
  styleUrls: ['./formin-admin.component.css']
})
export class ForminAdminComponent implements OnInit {
  @Input() Donhang:any ={}
  constructor() { }

  ngOnInit() {
    console.log(this.Donhang);
    
  }

}