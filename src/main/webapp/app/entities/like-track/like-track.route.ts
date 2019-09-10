import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';
import { LikeTrackComponent } from './like-track.component';
import { LikeTrackDetailComponent } from './like-track-detail.component';
import { LikeTrackUpdateComponent } from './like-track-update.component';
import { LikeTrackDeletePopupComponent } from './like-track-delete-dialog.component';
import { ILikeTrack } from 'app/shared/model/like-track.model';

@Injectable({ providedIn: 'root' })
export class LikeTrackResolve implements Resolve<ILikeTrack> {
  constructor(private service: LikeTrackService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILikeTrack> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LikeTrack>) => response.ok),
        map((likeTrack: HttpResponse<LikeTrack>) => likeTrack.body)
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

export const likeTrackPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LikeTrackDeletePopupComponent,
    resolve: {
      likeTrack: LikeTrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeTrack.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
