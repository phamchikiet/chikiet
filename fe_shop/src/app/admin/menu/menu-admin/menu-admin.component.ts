import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ButtonModule } from 'primeng/button';
import * as moment from 'moment';
import { ConvertDriveData, convertToSlug, groupByfield } from 'fe_shop/src/app/shared/shared.utils';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_KEY, GoogleSheetsDbService } from 'ng-google-sheets-db';
import { Observable, Subject, async, buffer, takeUntil } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { DanhmucService } from '../../main-admin/danhmuc/danhmuc.service';
import { MenuService } from '../menu.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatInputModule,
    RouterOutlet,
    MatMenuModule,
    RouterLink,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    ButtonModule,
    MatSelectModule,
    MatBadgeModule
  ],
  providers: [
    {
      provide: API_KEY,
      useValue: 'AIzaSyCWh10EgrjVBm8qKpnsGOgXrIsT5uqroMc',
    },
    GoogleSheetsDbService
  ],
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  Detail: any = {};
  Lists: any = {}
  SelectItem: any = {}
  ListDanhmuc: any = []
  FilterLists: any[] = []
  pageSizeOptions: any[] = []
  Sitemap: any = { loc: '', priority: '' }
  SearchParams: any = {
    // Batdau:moment().startOf('day').add(-1,'day').toDate(),
    // Ketthuc: moment().endOf('day').toDate(),
    pageSize: 10,
    pageNumber: 0
  };
  sidebarVisible: boolean = false;
  _MenuService: MenuService = inject(MenuService)
  _DanhmucService: DanhmucService = inject(DanhmucService)
  _googleSheetsDbService: GoogleSheetsDbService = inject(GoogleSheetsDbService)
  MenusDrive:any[]=[]
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  clientId = '677966057043-g9tjgmsmbsr1j7n4bfoqcq22t8c7go75.apps.googleusercontent.com';
  redirectUri = 'http://localhost:6100/admin/menu';
  apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/A1:B1';
  accessToken: string='';
  data: any;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}
  async ngOnInit(): Promise<void> {
    this.checkAccessToken();
    this._MenuService.getAllMenu();
    this._MenuService.menus$.subscribe((data) => {
      if (data) {
        this.FilterLists =data
        // console.log(data.map((v)=>({
        //   Title:v.Title,
        //   Danhmuc:v.Danhmuc,
        //   SKU:v.SKU,
        //   // Mota:v.Mota,
        //   // Noidung:v.Noidung,
        //   Slug:v.Slug,
        //   View:v.View,
        //   Banchay:v.Banchay,
        //   Noibat:v.Noibat,
        //   Moi:v.Moi,
        //   Type:v.Type,
        //   Ordering:v.Ordering,
        //   Status:v.Status
        // })));
        
      }
    })
    this.Lists = await this._MenuService.SearchMenu(this.SearchParams)
    this.ListDanhmuc = await this._DanhmucService.getAllDanhmuc()
   // this.FilterLists = this.Lists.items
  //  this.pageSizeOptions = [10, 20, this.Lists.totalCount].filter(v => v <= this.Lists.totalCount);
  }

  async LoadDrive()
  {
   const data =  await this._MenuService.getDrive();   
   const data1 =  await this._MenuService.createData();   
   this.MenusDrive = ConvertDriveData(data.values)||0   
  }
  GetTenDanhmuc(item: any) {
    return this.ListDanhmuc.find((v: any) => v.id_cat == item)?.Title
  }
  ChangeStatus(item: any, type: any) {
    item[type] = item[type] == 0 ? 1 : 0
    this._MenuService.UpdateMenu(item).then(() => {
      this._snackBar.open('Cập Nhật Thành Công', '', {
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: 'success',
        duration: 2000,
      });
    })
  }
  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (value.length > 2) {
      this.FilterLists = this.Lists.items.filter((v: any) => {
        return v.Title.toLowerCase().includes(value) || v.Mota.toLowerCase().includes(value)
      })
    }
    else { this.FilterLists = this.Lists.items }
  }
  async onPageChange(event: any) {
    console.log(event);
    this.SearchParams.pageSize = event.pageSize
    this.SearchParams.pageNumber = event.pageIndex
    this.Lists = await this._MenuService.SearchMenu(this.SearchParams)
    this.FilterLists = this.Lists.items
  }
  openDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._MenuService.CreateMenu(this.Detail).then(() => this.ngOnInit())
      }
    });
  }
  XoaDialog(teamplate: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(teamplate, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'true') {
        this._MenuService.DeleteMenu(this.SelectItem).then(() => this.ngOnInit())
      }
    });
  }
  FillSlug() {
    this.Detail.Slug = convertToSlug(this.Detail.Title)
  }
  readExcelFile(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = new Uint8Array((e.target as any).result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheetName1 = workbook.SheetNames[1];
      const worksheet = workbook.Sheets[sheetName];
      const worksheet1 = workbook.Sheets[sheetName1];
      const Menu = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      const Giagoc: any = XLSX.utils.sheet_to_json(worksheet1, { raw: true });
      console.log(Menu);
      console.log(groupByfield(Giagoc));
      Menu.forEach((v: any, k: any) => {
        setTimeout(() => {
          const item: any = {}
          const Image: any = { Main: v.photo, Thumb: v.thumb }
          item.id = v.id
          item.Giagoc = groupByfield(Giagoc).find((gg: any) => gg.idSP == v.id).children || []
          this._MenuService.UpdateMenu(item)
          // this._MenuService.CreateMenu(item)
          console.log(item);
        }, 100 * k);
      });


    };
    fileReader.readAsArrayBuffer(file);
  }

  writeExcelFile() {
    let Giagoc: any = []
    let item: any = {}
    this.FilterLists.forEach((v: any) => {
      item.idSP = v.id
      item.TenSP = v.Title
      v.Giagoc.forEach((gg: any) => {
        item = { ...item, ...gg }
        Giagoc.push(item)
      });
    });
    const workbook = XLSX.utils.book_new();
    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.FilterLists);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(Giagoc);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Menu');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Giagoc');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Menu_' + moment().format("DD_MM_YYYY"));
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }
  UpdateStatusMenu(item: any) {
    item.Status = 0
    this._MenuService.UpdateMenu(item).then(() => this.ngOnInit())
  }


  checkAccessToken() {
    this.accessToken = localStorage.getItem('accessToken')||'';
    if (this.accessToken) {
      this.fetchData();
    }
  }

  authorize() {
    const scope = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}&response_type=token`;
    window.location.href = url;
  }

  async fetchData() {
    const headers = new Headers({
      Authorization: `Bearer ${this.accessToken}`
    });
  
    try {
      const response = await fetch(this.apiUrl, {
        headers,
        method: 'GET'
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
  
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error(error);
    }
  }
  

  handleCallback(hash:any) {
    const params = new URLSearchParams(hash);
    this.accessToken = params.get('access_token')||'';
    localStorage.setItem('accessToken', this.accessToken);
    this.fetchData();
  }


}