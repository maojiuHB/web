import {Routes} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {SigninComponent} from './signin/signin.component';

export const SessionRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '404',
                component: NotFoundComponent,
                data: {
                    pageTitle: '页面未找到',
                }
            },
            {
                path: 'error',
                component: ErrorComponent,
                data: {
                    pageTitle: '错误',
                }
            },
            {
                path: 'accessdenied',
                component: ErrorComponent,
                data: {
                    pageTitle: '系统校验',
                    error403: true
                }
            },
            {
                path: 'signin',
                component: SigninComponent,
                data: {
                    pageTitle: '登录',
                }
            }
        ]
    }
];
