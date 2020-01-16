import { Route } from '@angular/router';

import { DeveloperComponent } from 'app/developer/developer.component';

export const DEVELOPER_ROUTE: Route = {
  path: 'api',
  component: DeveloperComponent,
  data: {
    authorities: ['ROLE_USER'],
    pageTitle: 'global.menu.admin.apidocs'
  }
};
