import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SallefySharedModule } from 'app/shared/shared.module';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import { adminState } from './admin.route';
import { AuditsComponent } from './audits/audits.component';
import { UserMgmtComponent } from './user-management/user-management.component';
import { UserMgmtDetailComponent } from './user-management/user-management-detail.component';
import { UserMgmtUpdateComponent } from './user-management/user-management-update.component';
import { UserMgmtDeleteDialogComponent } from './user-management/user-management-delete-dialog.component';
import { LogsComponent } from './logs/logs.component';
import { SfMetricsMonitoringComponent } from './metrics/metrics.component';
import { SfHealthModalComponent } from './health/health-modal.component';
import { SfHealthCheckComponent } from './health/health.component';
import { SfConfigurationComponent } from './configuration/configuration.component';
import { SfDocsComponent } from './docs/docs.component';

@NgModule({
  imports: [
    SallefySharedModule,
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild(adminState)
  ],
  declarations: [
    AuditsComponent,
    UserMgmtComponent,
    UserMgmtDetailComponent,
    UserMgmtUpdateComponent,
    UserMgmtDeleteDialogComponent,
    LogsComponent,
    SfConfigurationComponent,
    SfHealthCheckComponent,
    SfHealthModalComponent,
    SfDocsComponent,
    SfMetricsMonitoringComponent
  ],
  entryComponents: [UserMgmtDeleteDialogComponent, SfHealthModalComponent]
})
export class SallefyAdminModule {}
