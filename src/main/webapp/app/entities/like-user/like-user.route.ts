import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LikeUser } from 'app/shared/model/like-user.model';
import { LikeUserService } from './like-user.service';
import { LikeUserComponent } from './like-user.component';
import { LikeUserDetailComponent } from './like-user-detail.component';
import { LikeUserUpdateComponent } from './like-user-update.component';
import { LikeUserDeletePopupComponent } from './like-user-delete-dialog.component';
import { ILikeUser } from 'app/shared/model/like-user.model';

@Injectable({ providedIn: 'root' })
export class LikeUserResolve implements Resolve<ILikeUser> {
  constructor(private service: LikeUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILikeUser> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LikeUser>) => response.ok),
        map((likeUser: HttpResponse<LikeUser>) => likeUser.body)
      );
    }
    return of(new LikeUser());
  }
}

export const likeUserRoute: Routes = [
  {
    path: '',
    component: LikeUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LikeUserDetailComponent,
    resolve: {
      likeUser: LikeUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LikeUserUpdateComponent,
    resolve: {
      likeUser: LikeUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LikeUserUpdateComponent,
    resolve: {
      likeUser: LikeUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const likeUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LikeUserDeletePopupComponent,
    resolve: {
      likeUser: LikeUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeUser.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
