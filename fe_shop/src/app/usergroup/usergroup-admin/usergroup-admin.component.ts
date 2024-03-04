import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usergroup-admin',
  standalone:true,
  imports:[
    MatSidenavModule,
    RouterOutlet,
    MatInputModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    FormsModule,
    MatMenuModule
  ],
  templateUrl: './usergroup-admin.component.html',
  styleUrls: ['./usergroup-admin.component.css']
})
export class UsergroupAdminComponent implements OnInit {
  constructor() { }
  Detail:any={}
  ngOnInit() {
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
    //   this.Lists = this.Lists.filter((v) => {
    //  return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
    //    })
    }
  }
}



// import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatDrawer } from '@angular/material/sidenav';
// import { KhuyenmaiService } from './khuyenmai.service';
// import * as moment from 'moment';
// @Component({
//   selector: 'app-khuyenmai',
//   templateUrl: './khuyenmai.component.html',
//   styleUrls: ['./khuyenmai.component.css']
// })
// export class KhuyenmaiComponent implements OnInit {
//   Detail: any = {};
//   Lists: any[] = []
//   FilterLists: any[] = []
//   SearchParams: any = {Batdau:moment().startOf('day').toDate(),Ketthuc: moment().endOf('day').toDate()};
//   @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
//   constructor(
//     private dialog: MatDialog,
//     private _KhuyenmaiService: KhuyenmaiService,
//   ) {
//   }
//   ngOnInit(): void {
//     this._KhuyenmaiService.searchVttechthanhtoan(this.SearchParams).subscribe()
//     this._KhuyenmaiService.khuyenmais$.subscribe((data:any)=>{
//       this.FilterLists = this.Lists = data
//     })
//   }
//   ChoosenDate()
//   {
//     this._KhuyenmaiService.searchVttechthanhtoan(this.SearchParams).subscribe()
//   }
//   applyFilter(event: Event) {
//     const value = (event.target as HTMLInputElement).value;
//     if (value.length > 2) {
//       this.Lists = this.Lists.filter((v) => {
//      return  v.Hoten.toLowerCase().includes(value)||v.SDT.toLowerCase().includes(value)
//        }
//       )
//     }
//   }
//   openDialog(teamplate: TemplateRef<any>): void {
//     const dialogRef = this.dialog.open(teamplate, {
//     });
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result=="true") {
//         this._KhuyenmaiService.CreateKhuyenmai(this.Detail).subscribe()
//       }
//     });
//   }
//   openDeleteDialog(teamplate: TemplateRef<any>,item:any): void {
//     const dialogRef = this.dialog.open(teamplate, {});
//     dialogRef.afterClosed().subscribe((result) => {
//       if (result=="true") {
//         this._KhuyenmaiService.DeleteKhuyenmai(item.id).subscribe()
//       }
//     });
//   }
// }
