import { Route } from '@angular/router';
import { MuavaoComponent } from './site/muavao/muavao.component';
import { MuavaoChitietComponent } from './site/muavao/muavao-chitiet/muavao-chitiet.component';
import { BanraComponent } from './site/banra/banra.component';
import { BanraChitietComponent } from './site/banra/banra-chitiet/banra-chitiet.component';
import { CauhinhComponent } from './site/cauhinh/cauhinh.component';
import { XuatnhaptonComponent } from './site/xuatnhapton/xuatnhapton.component';
import { CauhinhDetailComponent } from './site/cauhinh/cauhinh-detail/cauhinh-detail.component';
import { SanphamComponent } from './site/sanpham/sanpham.component';
import { ShdhhpComponent } from './site/shdhhp/shdhhp.component';

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
        component: MuavaoChitietComponent,
        title: 'Mua Vào Chi Tiết'
    },
    {
        path: 'banra',
        component: BanraComponent,
        title: 'Bán Ra'
    },
    {
        path: 'banrachitiet',
        component: BanraChitietComponent,
        title: 'Bán Ra Chi Tiết'
    },
    {
        path: 'xuatnhapton',
        component: XuatnhaptonComponent,
        title: 'Xuất Nhập Tồn'
    }
];
