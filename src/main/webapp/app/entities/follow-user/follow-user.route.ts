import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFollowUser, FollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';
import { FollowUserComponent } from './follow-user.component';
import { FollowUserDetailComponent } from './follow-user-detail.component';
import { FollowUserUpdateComponent } from './follow-user-update.component';

@Injectable({ providedIn: 'root' })
export class FollowUserResolve implements Resolve<IFollowUser> {
  constructor(private service: FollowUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFollowUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((followUser: HttpResponse<FollowUser>) => {
          if (followUser.body) {
            return of(followUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
