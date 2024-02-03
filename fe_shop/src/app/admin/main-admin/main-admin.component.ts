import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
@Component({
  selector: 'app-main-admin',
  standalone:true,
  imports:[
    MatSidenavModule,
    RouterOutlet,
    MatInputModule,
    MatTreeModule,
    RouterLink,
    RouterOutlet,
    DatePipe,
    ProfileComponent
  ],
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  FilterLists: any[] = []
  Cuser: any = {}
  Menus: any[] = [
    {id:1,pid:0,Title:"Dashboard",Slug:"dashboard"},
    {id:2,pid:0,Title:"Sản Phẩm" ,Slug:"sanpham"},
    {id:3,pid:0,Title:"Danh Mục" ,Slug:"danhmuc"},
    {id:3,pid:0,Title:"Bài Viết" ,Slug:"baiviet"},
    {id:3,pid:0,Title:"Đơn Hàng" ,Slug:"donhang"},
    {id:3,pid:0,Title:"User" ,Slug:"user"},
    // {id:3,pid:0,Title:"Usergroup" ,Slug:"usergroup"},
  ]
  Today:any=new Date()
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      Title: node.Title,
      pid: node.pid,
      Slug: node.Slug,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<any>(
    node => node.level,
    node => node.expandable,
  );
  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  hasChild = (_: number, node: any) => node.expandable;
  dataSource: any
  isOpen: boolean = true
  DrawerMode: any = 'side'
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  constructor(
    private breakpointObserver: BreakpointObserver,
    // private _UsersService: UsersService,
  ) { }
  ngOnInit() {
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.Menus;
    this.treeControl.expandAll()
    this.breakpointObserver.observe([Breakpoints.XSmall])
      .subscribe((breakpoints: any) => {
        if (breakpoints.matches) {
          this.isOpen = false;
          this.DrawerMode = 'over'
        } else {
          this.DrawerMode = 'side'
          this.isOpen = true;
        }
      });
  }
  applyFilter(query: any) {

  }
  ChoosenMenu()
  {
    this.breakpointObserver.observe([Breakpoints.XSmall])
    .subscribe((breakpoints: any) => {
      if (breakpoints.matches) {
        this.drawer.close()
      }
    });
  }

}

