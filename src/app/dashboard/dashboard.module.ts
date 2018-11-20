import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {}
