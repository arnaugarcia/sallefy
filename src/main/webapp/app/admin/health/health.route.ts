import { Route } from '@angular/router';

import { SfHealthComponent } from './health.component';

export const healthRoute: Route = {
  path: '',
  component: SfHealthComponent,
  data: {
    pageTitle: 'health.title'
  }
};
