import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          // Static route for api documentation
          path: 'admin/docs',
          redirectTo: 'developer/api'
        },
        {
          path: 'admin',
          data: {
            authorities: ['ROLE_ADMIN']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        {
          path: 'developer',
          data: {
            authorities: ['ROLE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./developer/developer.module').then(m => m.DeveloperModule)
        },
        {
          path: 'playlist',
          data: {
            authorities: ['ROLE_USER']
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./playlist/playlist.module').then(m => m.SallefyPlaylistModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class SallefyAppRoutingModule {}
