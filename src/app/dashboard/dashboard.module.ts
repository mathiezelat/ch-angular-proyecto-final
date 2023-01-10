import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { PageWrapperComponent } from './layout/page-wrapper/page-wrapper.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, PageWrapperComponent],
  imports: [CommonModule, DashboardRoutingModule, MaterialModule, SharedModule],
})
export class DashboardModule {}
