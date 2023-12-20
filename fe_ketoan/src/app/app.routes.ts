import { Route } from '@angular/router';
import { MuavaoComponent } from './site/muavao/muavao.component';
import { MuavaoChitietComponent } from './site/muavao/muavao-chitiet/muavao-chitiet.component';
import { BanraComponent } from './site/banra/banra.component';
import { BanraChitietComponent } from './site/banra/banra-chitiet/banra-chitiet.component';
import { CauhinhComponent } from './site/cauhinh/cauhinh.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'muavao', pathMatch: 'full' },
    {
        path: 'cauhinh',
        component: CauhinhComponent,
        title: 'Cấu Hình'
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
    }
];
