import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dangnhap',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule
  ],
  templateUrl: './dangnhap.component.html',
  styleUrls: ['./dangnhap.component.css']
})
export class DangnhapComponent implements OnInit {

  constructor() { }
  User:any={}
  _AuthService:AuthService=inject(AuthService)
  _ActivatedRoute: ActivatedRoute = inject(ActivatedRoute);
  _Router: Router = inject(Router);
  ngOnInit() { }
  async Dangnhap()
  {
    const result = await this._AuthService.Dangnhap(this.User)
    if(result[0])
    {
      const redirectURL = this._ActivatedRoute.snapshot.queryParamMap.get('redirectURL');
      if(redirectURL)
      {
      this._Router.navigateByUrl(redirectURL);
      }
      else {window.location.href="/"}
    }
  }
}
