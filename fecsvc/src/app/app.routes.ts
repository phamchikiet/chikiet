import { Route } from "@angular/router";
import { MainSiteComponent } from "./main/main-admin/main-site/main-site.component";

export const appRoutes: Route[] = [
    // { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
    { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    {
        path: '',
        component: MainSiteComponent,
        title: 'Main',
        // children: [
        //     {
        //         path: '',
        //         component: TrangchuComponent,
        //         title: 'Trang Chủ'
        //     }
        // ]
    },
    // {
    //     path: 'admin',
    //     canActivate: [AuthGuard],
    //     component: MainAdminComponent,
    //     children: [
    //         {
    //             path: 'menu',
    //             component: MenuAdminComponent,
    //             children: [
    //                 {
    //                     path: ':id',
    //                     component: MenuAdminChitietComponent,
    //                 },
    //             ]
    //         }
    //     ]
    // },
];


