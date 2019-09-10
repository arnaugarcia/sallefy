import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from './track-sf.service';
import { TrackSfComponent } from './track-sf.component';
import { TrackSfDetailComponent } from './track-sf-detail.component';
import { TrackSfUpdateComponent } from './track-sf-update.component';
import { TrackSfDeletePopupComponent } from './track-sf-delete-dialog.component';
import { ITrackSf } from 'app/shared/model/track-sf.model';

@Injectable({ providedIn: 'root' })
export class TrackSfResolve implements Resolve<ITrackSf> {
  constructor(private service: TrackSfService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITrackSf> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TrackSf>) => response.ok),
        map((track: HttpResponse<TrackSf>) => track.body)
      );
    }
    return of(new TrackSf());
  }
}

export const trackRoute: Routes = [
  {
    path: '',
    component: TrackSfComponent,
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
    component: TrackSfDetailComponent,
    resolve: {
      track: TrackSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TrackSfUpdateComponent,
    resolve: {
      track: TrackSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TrackSfUpdateComponent,
    resolve: {
      track: TrackSfResolve
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
    component: TrackSfDeletePopupComponent,
    resolve: {
      track: TrackSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.track.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
