import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/shared/services/playlist.service';
import { PlaylistDetailComponent } from 'app/playlist/playlist-detail/playlist-detail.component';

@Injectable({ providedIn: 'root' })
export class PlaylistResolve implements Resolve<IPlaylist> {
  constructor(private service: PlaylistService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlaylist> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((playlist: HttpResponse<Playlist>) => {
          if (playlist.body) {
            return of(playlist.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Playlist());
  }
}

export const playlistRoute: Routes = [
  /*{
    path: '',
    component: PlaylistComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },*/
  {
    path: ':id',
    component: PlaylistDetailComponent,
    resolve: {
      playlist: PlaylistResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playlist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
  /* {
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
  } */
];
