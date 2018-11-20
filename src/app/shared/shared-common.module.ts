import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedLibsModule, VnVideoComponent } from './';
@NgModule({
    imports: [
        SharedLibsModule
    ],
    declarations: [
        VnVideoComponent
    ],
    entryComponents: [
    ],
    exports: [
        SharedLibsModule,
        VnVideoComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedCommonModule { }
