import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFollowPlaylist, FollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';
import { FollowPlaylistComponent } from './follow-playlist.component';
import { FollowPlaylistDetailComponent } from './follow-playlist-detail.component';
import { FollowPlaylistUpdateComponent } from './follow-playlist-update.component';

@Injectable({ providedIn: 'root' })
export class FollowPlaylistResolve implements Resolve<IFollowPlaylist> {
  constructor(private service: FollowPlaylistService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFollowPlaylist> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((followPlaylist: HttpResponse<FollowPlaylist>) => {
          if (followPlaylist.body) {
            return of(followPlaylist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FollowPlaylist());
  }
}

export const followPlaylistRoute: Routes = [
  {
    path: '',
    component: FollowPlaylistComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FollowPlaylistDetailComponent,
    resolve: {
      followPlaylist: FollowPlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FollowPlaylistUpdateComponent,
    resolve: {
      followPlaylist: FollowPlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FollowPlaylistUpdateComponent,
    resolve: {
      followPlaylist: FollowPlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
