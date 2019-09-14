import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Track } from 'app/shared/model/track.model';
import { TrackService } from './track.service';
import { TrackComponent } from './track.component';
import { TrackDetailComponent } from './track-detail.component';
import { TrackUpdateComponent } from './track-update.component';
import { TrackDeletePopupComponent } from './track-delete-dialog.component';
import { ITrack } from 'app/shared/model/track.model';

@Injectable({ providedIn: 'root' })
export class TrackResolve implements Resolve<ITrack> {
  constructor(private service: TrackService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrack> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Track>) => response.ok),
        map((track: HttpResponse<Track>) => track.body)
      );
    }
    return of(new Track());
  }
}

export const trackRoute: Routes = [
  {
    path: '',
    component: TrackComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
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

export const trackPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TrackDeletePopupComponent,
    resolve: {
      track: TrackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
