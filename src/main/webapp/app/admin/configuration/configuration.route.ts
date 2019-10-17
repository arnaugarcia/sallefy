import { Route } from '@angular/router';

import { SfConfigurationComponent } from './configuration.component';

export const configurationRoute: Route = {
  path: 'configuration',
  component: SfConfigurationComponent,
  data: {
    pageTitle: 'configuration.title'
  }
};
