import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';
import { FollowUserComponent } from './follow-user.component';
import { FollowUserDetailComponent } from './follow-user-detail.component';
import { FollowUserUpdateComponent } from './follow-user-update.component';
import { FollowUserDeletePopupComponent } from './follow-user-delete-dialog.component';
import { IFollowUser } from 'app/shared/model/follow-user.model';

@Injectable({ providedIn: 'root' })
export class FollowUserResolve implements Resolve<IFollowUser> {
  constructor(private service: FollowUserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFollowUser> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FollowUser>) => response.ok),
        map((followUser: HttpResponse<FollowUser>) => followUser.body)
      );
    }
    return of(new FollowUser());
  }
}

export const followUserRoute: Routes = [
  {
    path: '',
    component: FollowUserComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FollowUserDetailComponent,
    resolve: {
      followUser: FollowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FollowUserUpdateComponent,
    resolve: {
      followUser: FollowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FollowUserUpdateComponent,
    resolve: {
      followUser: FollowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const followUserPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FollowUserDeletePopupComponent,
    resolve: {
      followUser: FollowUserResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.followUser.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
