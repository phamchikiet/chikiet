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


export const appRoutes: Route[] = [
    // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
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
                    path: 'checkout',
                    component: CheckoutComponent,
                    title: 'Giỏ Hàng'
                },
                {
                    path: 'san-pham',
                    component: ListSanphamComponent,
                    title: 'Sản Phẩm'
                },
                {
                    path: 'san-pham/:slug',
                    component: DetailSanphamComponent,
                    title: 'Chi Tiết'
                },
                {
                    path: 'lien-he',
                    component: ContactComponent,
                },
        ]
    },
    {
        path: 'admin',
        component: MainAdminComponent,
        children:[ 
            {
                path: 'sanpham',
                component: SanphamComponent,
            },
            {
                path: 'sanpham/:id',
                component: SanphamChitietComponent,
            },
            {
                path: 'danhmuc',
                component: DanhmucComponent,
            },
            {
                path: 'danhmuc/:id',
                component: DanhmucChitietComponent,
            },

        ]
    },
];
