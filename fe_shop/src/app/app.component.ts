import { Component, HostBinding, HostListener, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { CommonModule } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './admin/users/auth/auth.service';
import { UsersInterceptor } from './admin/users/auth/users.interceptor';
import { AuthModule } from './admin/users/auth/auth.module';
import { SiteCtaComponent } from './admin/main-admin/admin-cta/site-cta/site-cta.component';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    MainComponent,
    CommonModule,
    NotifierModule,
    AuthModule,
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
  @HostListener('window:scroll')
  onScroll() {
    // const viewportHeight = window.innerHeight;
    // console.log(window.scrollY);
    // console.log(viewportHeight);
  }
  title = 'Shop Online';
  
}
