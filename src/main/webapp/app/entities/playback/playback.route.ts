import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPlayback, Playback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';
import { PlaybackComponent } from './playback.component';
import { PlaybackDetailComponent } from './playback-detail.component';
import { PlaybackUpdateComponent } from './playback-update.component';

@Injectable({ providedIn: 'root' })
export class PlaybackResolve implements Resolve<IPlayback> {
  constructor(private service: PlaybackService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPlayback> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((playback: HttpResponse<Playback>) => {
          if (playback.body) {
            return of(playback.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
