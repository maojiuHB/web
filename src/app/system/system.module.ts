import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedLibsModule} from '../shared';
import {RouterModule} from '@angular/router';
import {SystemRoutes} from './system.routing';
import {SettingComponent} from './setting/setting.component';

@NgModule({
    imports: [
        SharedLibsModule,
        RouterModule.forChild(SystemRoutes),
    ],
    declarations: [
        SettingComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SystemModule {
}
