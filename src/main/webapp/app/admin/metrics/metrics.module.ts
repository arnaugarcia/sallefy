import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SallefySharedModule } from 'app/shared/shared.module';

import { SfMetricsComponent } from './metrics.component';

import { metricsRoute } from './metrics.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild([metricsRoute])],
  declarations: [SfMetricsComponent]
})
export class MetricsModule {}
