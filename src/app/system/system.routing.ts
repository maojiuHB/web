import {Routes} from '@angular/router';

import {SettingComponent} from './setting/setting.component';

export const SystemRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'setting',
                component: SettingComponent,
                data: {
                    pageTitle: '账户',
                }
            }
        ]
    }
];
