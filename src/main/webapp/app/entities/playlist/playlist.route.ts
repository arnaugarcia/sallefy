import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Playlist } from 'app/shared/model/playlist.model';
import { PlaylistService } from './playlist.service';
import { PlaylistComponent } from './playlist.component';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistUpdateComponent } from './playlist-update.component';
import { PlaylistDeletePopupComponent } from './playlist-delete-dialog.component';
import { IPlaylist } from 'app/shared/model/playlist.model';

@Injectable({ providedIn: 'root' })
export class PlaylistResolve implements Resolve<IPlaylist> {
  constructor(private service: PlaylistService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaylist> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Playlist>) => response.ok),
        map((playlist: HttpResponse<Playlist>) => playlist.body)
      );
    }
    return of(new Playlist());
  }
}

export const playlistRoute: Routes = [
  {
    path: '',
    component: PlaylistComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaylistDetailComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaylistUpdateComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaylistUpdateComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const playlistPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaylistDeletePopupComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
