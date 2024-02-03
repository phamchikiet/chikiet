import { Component, OnInit, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../users/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[MatMenuModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  _AuthService:AuthService=inject(AuthService)
  _Router:Router=inject(Router)
  ngOnInit() {
  }
  Dangxuat()
  {
    const result = this._AuthService.Dangxuat()
    if(result){
      window.location.href ='/'
    }

  }

}
