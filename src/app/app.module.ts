import { BidiModule } from '@angular/cdk/bidi';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorIntl,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBar,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LocalStorageService, Ng2Webstorage, SessionStorageService } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import {
    AccordionAnchorDirective,
    AccordionDirective,
    AccordionLinkDirective,
    AdminLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    MeetingCoreModule,
    MenuComponent,
    OptionsComponent,
    SidebarComponent
} from './core';
import { EventManager, SharedModule, PaginatorIntl } from './shared';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent,
        OptionsComponent,
        MenuComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        AccordionAnchorDirective,
        AccordionLinkDirective,
        AccordionDirective,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(AppRoutes, { useHash: true }),
        SharedModule,
        MeetingCoreModule,
        Ng2Webstorage.forRoot({ prefix: 'vn', separator: '-' }),
        FormsModule,
        HttpClientModule,
        LoadingBarRouterModule,
        MatSidenavModule,
        MatCardModule,
        MatMenuModule,
        MatCheckboxModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        MatListModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressBarModule,
        MatSnackBarModule,
        FlexLayoutModule,
        BidiModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: PaginatorIntl },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [LocalStorageService, SessionStorageService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [Injector]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [EventManager, MatSnackBar]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [EventManager, MatSnackBar]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
