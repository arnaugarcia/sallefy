import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PlaylistSf } from 'app/shared/model/playlist-sf.model';
import { PlaylistSfService } from './playlist-sf.service';
import { PlaylistSfComponent } from './playlist-sf.component';
import { PlaylistSfDetailComponent } from './playlist-sf-detail.component';
import { PlaylistSfUpdateComponent } from './playlist-sf-update.component';
import { PlaylistSfDeletePopupComponent } from './playlist-sf-delete-dialog.component';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';

@Injectable({ providedIn: 'root' })
export class PlaylistSfResolve implements Resolve<IPlaylistSf> {
  constructor(private service: PlaylistSfService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlaylistSf> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PlaylistSf>) => response.ok),
        map((playlist: HttpResponse<PlaylistSf>) => playlist.body)
      );
    }
    return of(new PlaylistSf());
  }
}

export const playlistRoute: Routes = [
  {
    path: '',
    component: PlaylistSfComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaylistSfDetailComponent,
    resolve: {
      playlist: PlaylistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaylistSfUpdateComponent,
    resolve: {
      playlist: PlaylistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaylistSfUpdateComponent,
    resolve: {
      playlist: PlaylistSfResolve
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
    component: PlaylistSfDeletePopupComponent,
    resolve: {
      playlist: PlaylistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
