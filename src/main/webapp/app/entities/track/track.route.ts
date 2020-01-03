import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITrack, Track } from 'app/shared/model/track.model';
import { TrackService } from './track.service';
import { TrackComponent } from './track.component';
import { TrackDetailComponent } from './track-detail.component';
import { TrackUpdateComponent } from './track-update.component';

@Injectable({ providedIn: 'root' })
export class TrackResolve implements Resolve<ITrack> {
  constructor(private service: TrackService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrack> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((track: HttpResponse<Track>) => {
          if (track.body) {
            return of(track.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Track());
  }
}

export const trackRoute: Routes = [
  {
    path: '',
    component: TrackComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TrackDetailComponent,
    resolve: {
      track: TrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TrackUpdateComponent,
    resolve: {
      track: TrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TrackUpdateComponent,
    resolve: {
      track: TrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
