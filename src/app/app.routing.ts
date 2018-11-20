import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [{
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
        path: 'system',
        loadChildren: './system/system.module#SystemModule'
    }, {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    }]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'session',
        loadChildren: './session/session.module#SessionModule'
    }]
}, {
    path: '**',
    redirectTo: 'session/404'
}];
