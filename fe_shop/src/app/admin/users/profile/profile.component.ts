import { Component, OnInit, inject } from '@angular/core';
import { LocalStorageService } from 'fe_shop/src/app/shared/localstorage.service';
import { UsersService } from '../auth/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from 'fe_shop/src/app/shared/avatar/avatar.component';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    AvatarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  _UsersService: UsersService = inject(UsersService);
  _LocalStorageService: LocalStorageService = inject(LocalStorageService);
  User: any = {}
  Token:any=this._LocalStorageService.getItem('token') ?? null;
  constructor() {
    if(this.Token)
    {
      this._UsersService.getProfile()
      this._UsersService.profile$.subscribe((data) => {
        if (data) {
          this.User = data
          console.log(this.User); 
        }
      })
    }
  }
  ngOnInit() {
  }
  GetUpload(e:any)
  {
    console.log(e.src);
    
    this.User.Image.Main = e.src
    this._UsersService.UpdateUser(this.User);
  }

}
