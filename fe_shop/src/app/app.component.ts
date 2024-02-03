import { Component, HostBinding, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { CommonModule } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './admin/users/auth/auth.service';
import { UsersInterceptor } from './admin/users/auth/users.interceptor';
import { AuthModule } from './admin/users/auth/auth.module';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainComponent,
    CommonModule,
    NotifierModule,
    AuthModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: UsersInterceptor, multi: true },
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Shop Online';
}
