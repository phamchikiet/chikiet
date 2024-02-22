import { Route } from '@angular/router';
import { MainSiteComponent } from './main/main-site/main-site.component';
import { DexuatthanhtoanSiteComponent } from './dexuatthanhtoan/dexuatthanhtoan-site/dexuatthanhtoan-site.component';
import { TrangchuSiteComponent } from './trangchu/trangchu-site/trangchu-site.component';

export const appRoutes: Route[] = [
    // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
    //{ path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    {
        path: '',
        component: MainSiteComponent,
        title: 'Main',
        children:[ 
                {
                    path: '',
                    component: TrangchuSiteComponent,
                    title: 'Trang Chủ'
                },
                {
                    path: 'dexuatthanhtoan',
                    component: DexuatthanhtoanSiteComponent,
                    title: 'Đề xuất'
                }
        ]
    },
    // {
    //     path: 'admin',
    //     canActivate:[AuthGuard],
    //     component: MainAdminComponent,
    //     children:[ 
    //         {
    //             path: 'dashboard',
    //             component: DashboardComponent,
    //         },
    //         {
    //             path: 'donhang',
    //             component: DonhangAdminComponent,
    //             children:[
    //                 {
    //                     path: ':id',
    //                     component: DonhangAdminChitietComponent,
    //                 },
    //             ]
    //         },
    //         {
    //             path: 'khachhang',
    //             component: AdminKhachhangComponent,
    //             children:[
    //                 {
    //                     path: ':id',
    //                     component: DonhangAdminChitietComponent,
    //                 },
    //             ]
    //         },
    //         {
    //             path: 'sanpham',
    //             component: SanphamComponent,
    //             children:[
    //                 {
    //                     path: ':id',
    //                     component: SanphamChitietComponent,
    //                 },
    //             ]
    //         },
    //         {
    //             path: 'danhmuc',
    //             component: DanhmucComponent,
    //             children:[
    //                 {
    //                     path: ':id',
    //                     component: DanhmucChitietComponent,
    //                 },
    //             ]
    //         },

    //         {
    //             path: 'baiviet',
    //             component: BaivietAdminComponent,
    //             children:[
    //                 {
    //                     path: ':id',
    //                     component: BaivietadminChitietComponent,
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'lienhe',
    //             component: AdminLienheComponent,
    //             children:[
    //                 {
    //                     path: ':id',
    //                     component: AdminLienheChitietComponent,
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'khuyenmai',
    //             component: AdminChuongtrinhkhuyenmaiComponent,
    //             // children:[
    //             //     {
    //             //         path: ':id',
    //             //         component: AdminLienheChitietComponent,
    //             //     }
    //             // ]
    //         },
    //         {
    //             path: 'user',
    //             component: AdminuserComponent,
    //             children:[
    //                 {path:':id',component:AdminuserDetailComponent}
    //             ]
    //         },
    //         {
    //             path: 'tonkho',
    //             component: AdminTonkhoComponent,
    //             children:[
    //                {path:':id',component:AdminTonkhoChitietComponent}
    //             ]
    //         },

    //     ]
    // },
];
