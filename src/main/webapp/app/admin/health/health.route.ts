import { Route } from '@angular/router';

import { SfHealthCheckComponent } from './health.component';

export const healthRoute: Route = {
  path: 'health',
  component: SfHealthCheckComponent,
  data: {
    pageTitle: 'health.title'
  }
};
