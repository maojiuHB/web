import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../core';
import { UserManagementComponent } from './user-management/user-management.component';
import { AuditsComponent } from './audits/audits.component';
import { LogsComponent } from './logs/logs.component';
import { DocsComponent } from './docs/docs.component';
import { HealthCheckComponent } from './health/health.component';
export const AdminRoutes: Routes = [{
    path: '',
    data: {
        authorities: ['ROLE_ADMIN']
    },
    canActivate: [UserRouteAccessService],
    children: [{
        path: 'user-management',
        component: UserManagementComponent,
        data: {
            pageTitle: '用户管理'
        }
    }, {
        path: 'audits',
        component: AuditsComponent,
        data: {
            pageTitle: '审核',
        }
    }, {
        path: 'logs',
        component: LogsComponent,
        data: {
            pageTitle: '日志'
        }
    }, {
        path: 'health',
        component: HealthCheckComponent,
        data: {
            pageTitle: '健康检查'
        }
    }, {
        path: 'docs',
        component: DocsComponent,
        data: {
            pageTitle: 'API'
        }
    }
    ]
}
];
