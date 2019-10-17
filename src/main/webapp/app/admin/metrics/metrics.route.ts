import { Route } from '@angular/router';

import { SfMetricsMonitoringComponent } from './metrics.component';

export const metricsRoute: Route = {
  path: 'metrics',
  component: SfMetricsMonitoringComponent,
  data: {
    pageTitle: 'metrics.title'
  }
};
