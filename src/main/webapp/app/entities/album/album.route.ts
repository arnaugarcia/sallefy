import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';
import { AlbumComponent } from './album.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumUpdateComponent } from './album-update.component';
import { AlbumDeletePopupComponent } from './album-delete-dialog.component';
import { IAlbum } from 'app/shared/model/album.model';

@Injectable({ providedIn: 'root' })
export class AlbumResolve implements Resolve<IAlbum> {
  constructor(private service: AlbumService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlbum> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Album>) => response.ok),
        map((album: HttpResponse<Album>) => album.body)
      );
    }
    return of(new Album());
  }
}

export const albumRoute: Routes = [
  {
    path: '',
    component: AlbumComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlbumDetailComponent,
    resolve: {
      album: AlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlbumUpdateComponent,
    resolve: {
      album: AlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlbumUpdateComponent,
    resolve: {
      album: AlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const albumPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AlbumDeletePopupComponent,
    resolve: {
      album: AlbumResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
