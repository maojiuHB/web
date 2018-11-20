import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin.routing';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserManagementDialogComponent } from './user-management/user-management-dialog/user-management-dialog.component';
import { AuditsComponent } from './audits/audits.component';
import { LogsComponent } from './logs/logs.component';
import { DocsComponent } from './docs/docs.component';
import { HealthDialogComponent } from './health/health-dialog.component';
import { HealthCheckComponent } from './health/health.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(AdminRoutes),
  ],
  entryComponents: [
    UserManagementDialogComponent,
    HealthDialogComponent,
  ],
  declarations: [
    UserManagementComponent,
    UserManagementDialogComponent,
    AuditsComponent,
    LogsComponent,
    DocsComponent,
    HealthDialogComponent,
    HealthCheckComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
