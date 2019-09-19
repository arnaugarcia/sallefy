import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';
import { FollowPlaylistComponent } from './follow-playlist.component';
import { FollowPlaylistDetailComponent } from './follow-playlist-detail.component';
import { FollowPlaylistUpdateComponent } from './follow-playlist-update.component';
import { FollowPlaylistDeletePopupComponent } from './follow-playlist-delete-dialog.component';
import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';

@Injectable({ providedIn: 'root' })
export class FollowPlaylistResolve implements Resolve<IFollowPlaylist> {
  constructor(private service: FollowPlaylistService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFollowPlaylist> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FollowPlaylist>) => response.ok),
        map((followPlaylist: HttpResponse<FollowPlaylist>) => followPlaylist.body)
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

export const followPlaylistPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FollowPlaylistDeletePopupComponent,
    resolve: {
      followPlaylist: FollowPlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followPlaylist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
