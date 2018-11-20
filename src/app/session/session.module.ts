import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SessionRoutes} from './session.routing';
import {NotFoundComponent} from './not-found/not-found.component';
import {ErrorComponent} from './error/error.component';
import {SigninComponent} from './signin/signin.component';
import {SharedModule} from '../shared';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(SessionRoutes),
    ],
    declarations: [
        NotFoundComponent,
        ErrorComponent,
        SigninComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SessionModule {
}
