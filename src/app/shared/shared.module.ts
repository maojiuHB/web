import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedLibsModule, SharedCommonModule, HasAnyAuthorityDirective } from './';
import {
    CapitalizePipe, FilterPipe, KeysPipe, OrderByPipe, PureFilterPipe, ReversePipe,
    TruncateCharactersPipe, TruncateWordsPipe, ForiPipe, SnapshotsUrlPipe, PicUrlPipe
} from './pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl } from 'ng-pick-datetime';
import { OwlDefaultIntl } from './intl/owl-default-intl';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true,
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
};
@NgModule({
    imports: [
        SharedLibsModule,
        SharedCommonModule
    ],
    declarations: [
        HasAnyAuthorityDirective,
        CapitalizePipe,
        FilterPipe,
        ForiPipe,
        KeysPipe,
        OrderByPipe,
        PureFilterPipe,
        ReversePipe,
        SnapshotsUrlPipe,
        PicUrlPipe,
        TruncateCharactersPipe,
        TruncateWordsPipe,
    ],
    providers: [
        // 时间控件中文化
        { provide: OwlDateTimeIntl, useClass: OwlDefaultIntl },
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
    ],
    entryComponents: [],
    exports: [
        PerfectScrollbarModule,
        SharedCommonModule,
        // 时间选择控件 可能控件依赖问题 必须跟中文化的priveder 在一个文件中
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        HasAnyAuthorityDirective,
        CapitalizePipe,
        FilterPipe,
        ForiPipe,
        KeysPipe,
        OrderByPipe,
        PureFilterPipe,
        SnapshotsUrlPipe,
        PicUrlPipe,
        ReversePipe,
        TruncateCharactersPipe,
        TruncateWordsPipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
