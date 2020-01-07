import { Route } from '@angular/router';

import { SfDocsComponent } from './docs.component';

export const docsRoute: Route = {
  path: 'docs',
  component: SfDocsComponent,
  data: {
    pageTitle: 'global.menu.admin.apidocs'
  }
};
