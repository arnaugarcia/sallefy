import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Playback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';
import { PlaybackComponent } from './playback.component';
import { PlaybackDetailComponent } from './playback-detail.component';
import { PlaybackUpdateComponent } from './playback-update.component';
import { PlaybackDeletePopupComponent } from './playback-delete-dialog.component';
import { IPlayback } from 'app/shared/model/playback.model';

@Injectable({ providedIn: 'root' })
export class PlaybackResolve implements Resolve<IPlayback> {
  constructor(private service: PlaybackService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlayback> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Playback>) => response.ok),
        map((playback: HttpResponse<Playback>) => playback.body)
      );
    }
    return of(new Playback());
  }
}

export const playbackRoute: Routes = [
  {
    path: '',
    component: PlaybackComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playback.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlaybackDetailComponent,
    resolve: {
      playback: PlaybackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playback.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlaybackUpdateComponent,
    resolve: {
      playback: PlaybackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playback.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlaybackUpdateComponent,
    resolve: {
      playback: PlaybackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playback.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const playbackPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlaybackDeletePopupComponent,
    resolve: {
      playback: PlaybackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.playback.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
