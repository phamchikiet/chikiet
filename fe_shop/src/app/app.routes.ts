import { Route } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { ListSanphamComponent } from './site/sanpham/list-sanpham/list-sanpham.component';
import { DetailSanphamComponent } from './site/sanpham/detail-sanpham/detail-sanpham.component';
import { TrangchuComponent } from './site/trangchu/trangchu.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { ContactComponent } from './admin/main-admin/website/contact/contact.component';
import { GiohangComponent } from './admin/main-admin/website/giohang/giohang.component';
import { CheckoutComponent } from './admin/main-admin/website/checkout/checkout.component';
import { SanphamComponent } from './admin/main-admin/sanpham/sanpham.component';
import { SanphamChitietComponent } from './admin/main-admin/sanpham/sanpham-chitiet/sanpham-chitiet.component';
import { DanhmucComponent } from './admin/main-admin/danhmuc/danhmuc.component';
import { DanhmucChitietComponent } from './admin/main-admin/danhmuc/danhmuc-chitiet/danhmuc-chitiet.component';
import { DashboardComponent } from './admin/main-admin/dashboard/dashboard.component';
import { BaivietChitietComponent } from './site/baiviet/baiviet-chitiet/baiviet-chitiet.component';
import { BaivietComponent } from './site/baiviet/baiviet.component';
import { BaivietStyle1Component } from './site/baiviet/baiviet-style1/baiviet-style1.component';
import { BaivietAdminComponent } from './admin/main-admin/baiviet-admin/baiviet-admin.component';
import { BaivietAdminChitietComponent } from './admin/main-admin/baiviet-admin/baiviet-admin-chitiet/baiviet-admin-chitiet.component';
import { SanphamyeuthichComponent } from './admin/main-admin/website/sanphamyeuthich/sanphamyeuthich.component';
import { ThanhtoanComponent } from './admin/main-admin/website/thanhtoan/thanhtoan.component';
import { DonhangAdminComponent } from './admin/main-admin/donhang-admin/donhang-admin.component';
import { DonhangComponent } from './admin/main-admin/website/donhang/donhang.component';
import { CamonComponent } from './admin/main-admin/website/camon/camon.component';
import { TracuudonComponent } from './admin/main-admin/website/tracuudon/tracuudon.component';
import { DonhangAdminChitietComponent } from './admin/main-admin/donhang-admin/donhang-admin-chitiet/donhang-admin-chitiet.component';


export const appRoutes: Route[] = [
    // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
    { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    {
        path: '',
        component: MainComponent,
        title: 'Main',
        children:[ 
                {
                    path: '',
                    component: TrangchuComponent,
                    title: 'Trang Chủ'
                },
                {
                    path: 'gio-hang',
                    component: GiohangComponent,
                    title: 'Giỏ Hàng'
                },
                {
                    path: 'thanh-toan',
                    component: ThanhtoanComponent,
                    title: 'Thanh Toán'
                },
                {
                    path: 'don-hang',
                    component: DonhangComponent,
                    title: 'Đơn Hàng'
                },
                {
                    path: 'cam-on',
                    component: CamonComponent,
                    title: 'Cảm Ơn'
                },
                {
                    path: 'san-pham-yeu-thich',
                    component: SanphamyeuthichComponent,
                    title: 'Sản Phẩm Yêu Thích'
                },
                {
                    path: 'danh-muc/:slug',
                    component: ListSanphamComponent,
                    title: 'Danh Mục'
                },
                {
                    path: 'san-pham/:slug',
                    component: DetailSanphamComponent,
                    title: 'Chi Tiết'
                },
                {
                    path: 'khuyen-mai',
                    component: BaivietComponent,
                },
                {
                    path: 'khuyen-mai/:slug',
                    component: BaivietChitietComponent,
                },
                {
                    path: 'mon-ngon-moi-ngay',
                    component: BaivietStyle1Component,
                },
                {
                    path: 'tin-tuc',
                    component: BaivietStyle1Component,
                },
                {
                    path: 'lien-he',
                    component: ContactComponent,
                },
                {
                    path: 'tra-cuu-don',
                    component: TracuudonComponent,
                },
        ]
    },
    {
        path: 'admin',
        component: MainAdminComponent,
        children:[ 
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'donhang',
                component: DonhangAdminComponent,
                children:[
                    {
                        path: ':id',
                        component: DonhangAdminChitietComponent,
                    },
                ]
            },
            {
                path: 'sanpham',
                component: SanphamComponent,
                children:[
                    {
                        path: ':id',
                        component: SanphamChitietComponent,
                    },
                ]
            },
            {
                path: 'danhmuc',
                component: DanhmucComponent,
            },
            {
                path: 'danhmuc/:id',
                component: DanhmucChitietComponent,
            },
            {
                path: 'baiviet',
                component: BaivietAdminComponent,
            },
            {
                path: 'baiviet/:id',
                component: BaivietAdminChitietComponent,
            },

        ]
    },
];
