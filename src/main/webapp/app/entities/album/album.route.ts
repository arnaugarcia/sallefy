import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAlbum, Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';
import { AlbumComponent } from './album.component';
import { AlbumDetailComponent } from './album-detail.component';
import { AlbumUpdateComponent } from './album-update.component';

@Injectable({ providedIn: 'root' })
export class AlbumResolve implements Resolve<IAlbum> {
  constructor(private service: AlbumService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAlbum> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((album: HttpResponse<Album>) => {
          if (album.body) {
            return of(album.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
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
