import { Route } from '@angular/router';
import { MuavaoComponent } from './site/muavao/muavao.component';
import { BanraComponent } from './site/banra/banra.component';
import { CauhinhComponent } from './site/cauhinh/cauhinh.component';
import { CauhinhDetailComponent } from './site/cauhinh/cauhinh-detail/cauhinh-detail.component';
import { SanphamComponent } from './site/sanpham/sanpham.component';
import { ShdhhpComponent } from './site/shdhhp/shdhhp.component';
import { BanrachitietComponent } from './site/banra/banra-chitiet/banra-chitiet.component';
import { MuavaochitietComponent } from './site/muavao/muavao-chitiet/muavao-chitiet.component';
import { NhapkhoComponent } from './site/nhapkho/nhapkho.component';
import { XuatkhoComponent } from './site/xuatkho/xuatkho.component';
import { XuatnhaptonComponent } from './site/xuatnhapton/xuatnhapton.component';
import { TonkhoComponent } from './site/tonkho/tonkho.component';
import { SanphamchungComponent } from './site/sanpham/sanphamchung/sanphamchung.component';
import { TonghopComponent } from './site/tonghop/tonghop.component';
import { XNTComponent } from './site/xuatnhapton/xnt/xnt.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'shdhhp', pathMatch: 'full' },
    {
        path: 'shdhhp',
        component: ShdhhpComponent,
    },
    {
        path: 'sanpham',
        component: SanphamComponent,
    },
    {
        path: 'sanphamchung',
        component: SanphamchungComponent,
    },
    {
        path: 'cauhinh',
        component: CauhinhComponent,
        title: 'Cấu Hình'
    },
    {
        path: 'test',
        component: CauhinhDetailComponent,
        title: 'Test'
    },
    {
        path: 'muavao',
        component: MuavaoComponent,
        title: 'Mua Vào'
    },
    {
        path: 'muavaochitiet',
        component: MuavaochitietComponent,
        title: 'Mua Vào Chi Tiết'
    },
    {
        path: 'banra',
        component: BanraComponent,
        title: 'Bán Ra'
    },
    {
        path: 'banrachitiet',
        component: BanrachitietComponent,
        title: 'Bán Ra Chi Tiết'
    },
    {
        path: 'nhapkho',
        component: NhapkhoComponent,
        title: 'Nhập Kho'
    },
    {
        path: 'xuatkho',
        component: XuatkhoComponent,
        title: 'Xuất Kho'
    },
    {
        path: 'tonkho',
        component: TonkhoComponent,
        title: 'Tồn Kho'
    },
    {
        path: 'xuatnhapton',
        component: XuatnhaptonComponent,
        title: 'Xuất Nhập Tồn'
    },
    // {
    //     path: 'XNT',
    //     component: XNTComponent,
    //     title: 'Xuất Nhập Tồn'
    // },
    {
        path: 'tonghop',
        component: TonghopComponent,
        title: 'Tổng Hợp'
    }
];
