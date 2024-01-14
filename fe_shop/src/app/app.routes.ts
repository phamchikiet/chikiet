import { Route } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { ListSanphamComponent } from './site/sanpham/list-sanpham/list-sanpham.component';
import { DetailSanphamComponent } from './site/sanpham/detail-sanpham/detail-sanpham.component';
import { TrangchuComponent } from './site/trangchu/trangchu.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { ContactComponent } from './admin/main-admin/website/contact/contact.component';
import { GiohangComponent } from './admin/main-admin/website/giohang/giohang.component';
import { CheckoutComponent } from './admin/main-admin/website/checkout/checkout.component';


export const appRoutes: Route[] = [
    { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
    {
        path: '',
        component: MainComponent,
        title: 'Main',
        children:[ 
                {
                    path: 'trang-chu',
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
                // {
                //     path: 'trang-chu',
                //     component: TrangchuComponent,
                //     title: 'Trang Chủ'
                // },

        ]
    },
];
