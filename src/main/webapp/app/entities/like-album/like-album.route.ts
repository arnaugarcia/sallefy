import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILikeAlbum, LikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';
import { LikeAlbumComponent } from './like-album.component';
import { LikeAlbumDetailComponent } from './like-album-detail.component';
import { LikeAlbumUpdateComponent } from './like-album-update.component';

@Injectable({ providedIn: 'root' })
export class LikeAlbumResolve implements Resolve<ILikeAlbum> {
  constructor(private service: LikeAlbumService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILikeAlbum> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((likeAlbum: HttpResponse<LikeAlbum>) => {
          if (likeAlbum.body) {
            return of(likeAlbum.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LikeAlbum());
  }
}

export const likeAlbumRoute: Routes = [
  {
    path: '',
    component: LikeAlbumComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeAlbum.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LikeAlbumDetailComponent,
    resolve: {
      likeAlbum: LikeAlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeAlbum.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LikeAlbumUpdateComponent,
    resolve: {
      likeAlbum: LikeAlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeAlbum.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LikeAlbumUpdateComponent,
    resolve: {
      likeAlbum: LikeAlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeAlbum.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
