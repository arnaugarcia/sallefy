import { Route } from '@angular/router';

import { SfMetricsComponent } from './metrics.component';

export const metricsRoute: Route = {
  path: '',
  component: SfMetricsComponent,
  data: {
    pageTitle: 'metrics.title'
  }
};
