import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HoadonbanraComponent } from './site/hoadonbanra/hoadonbanra.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
@Component({
  standalone: true,
  imports: [
    RouterModule,
    HoadonbanraComponent,
    FormsModule,
    CommonModule,
    SidebarModule,
    ButtonModule,
    SplitterModule
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  sidebarVisible: boolean = false;
  title = 'fe_ketoan';
  Detail:any={}
  FilterLists:any[]=[
    {id:1,Slug:'',Title:''}
  ]
  applyFilter(e:any)
  {
    // console.log("abc");
  }
  
}
