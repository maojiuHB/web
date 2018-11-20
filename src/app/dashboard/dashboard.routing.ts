import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from '../core';

export const DashboardRoutes: Routes = [
    {
        path: '',
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: '主页'
        },
        canActivate: [UserRouteAccessService],
        component: DashboardComponent
    }
];
