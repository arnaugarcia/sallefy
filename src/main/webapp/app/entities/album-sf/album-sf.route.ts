import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from './album-sf.service';
import { AlbumSfComponent } from './album-sf.component';
import { AlbumSfDetailComponent } from './album-sf-detail.component';
import { AlbumSfUpdateComponent } from './album-sf-update.component';
import { AlbumSfDeletePopupComponent } from './album-sf-delete-dialog.component';
import { IAlbumSf } from 'app/shared/model/album-sf.model';

@Injectable({ providedIn: 'root' })
export class AlbumSfResolve implements Resolve<IAlbumSf> {
  constructor(private service: AlbumSfService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAlbumSf> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<AlbumSf>) => response.ok),
        map((album: HttpResponse<AlbumSf>) => album.body)
      );
    }
    return of(new AlbumSf());
  }
}

export const albumRoute: Routes = [
  {
    path: '',
    component: AlbumSfComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AlbumSfDetailComponent,
    resolve: {
      album: AlbumSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AlbumSfUpdateComponent,
    resolve: {
      album: AlbumSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AlbumSfUpdateComponent,
    resolve: {
      album: AlbumSfResolve
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
    component: AlbumSfDeletePopupComponent,
    resolve: {
      album: AlbumSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.album.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
