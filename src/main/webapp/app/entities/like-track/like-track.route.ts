import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILikeTrack, LikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';
import { LikeTrackComponent } from './like-track.component';
import { LikeTrackDetailComponent } from './like-track-detail.component';
import { LikeTrackUpdateComponent } from './like-track-update.component';

@Injectable({ providedIn: 'root' })
export class LikeTrackResolve implements Resolve<ILikeTrack> {
  constructor(private service: LikeTrackService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILikeTrack> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((likeTrack: HttpResponse<LikeTrack>) => {
          if (likeTrack.body) {
            return of(likeTrack.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LikeTrack());
  }
}

export const likeTrackRoute: Routes = [
  {
    path: '',
    component: LikeTrackComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeTrack.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LikeTrackDetailComponent,
    resolve: {
      likeTrack: LikeTrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeTrack.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LikeTrackUpdateComponent,
    resolve: {
      likeTrack: LikeTrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeTrack.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LikeTrackUpdateComponent,
    resolve: {
      likeTrack: LikeTrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeTrack.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
