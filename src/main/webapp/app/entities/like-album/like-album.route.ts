import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';
import { LikeAlbumComponent } from './like-album.component';
import { LikeAlbumDetailComponent } from './like-album-detail.component';
import { LikeAlbumUpdateComponent } from './like-album-update.component';
import { LikeAlbumDeletePopupComponent } from './like-album-delete-dialog.component';
import { ILikeAlbum } from 'app/shared/model/like-album.model';

@Injectable({ providedIn: 'root' })
export class LikeAlbumResolve implements Resolve<ILikeAlbum> {
  constructor(private service: LikeAlbumService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILikeAlbum> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<LikeAlbum>) => response.ok),
        map((likeAlbum: HttpResponse<LikeAlbum>) => likeAlbum.body)
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

export const likeAlbumPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: LikeAlbumDeletePopupComponent,
    resolve: {
      likeAlbum: LikeAlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.likeAlbum.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
