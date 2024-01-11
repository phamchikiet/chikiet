import { Route } from '@angular/router';
import { MainComponent } from './site/main/main.component';
import { HeaderComponent } from './site/header/header.component';


export const appRoutes: Route[] = [
    { path: '', redirectTo: 'muavao', pathMatch: 'full' },
    {
        path: '',
        component: MainComponent,
        title: 'Trang Chủ'
    },
    {
        path: 'test',
        component: HeaderComponent,
        title: 'Test'
    },
];
