import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from './artist-sf.service';
import { ArtistSfComponent } from './artist-sf.component';
import { ArtistSfDetailComponent } from './artist-sf-detail.component';
import { ArtistSfUpdateComponent } from './artist-sf-update.component';
import { ArtistSfDeletePopupComponent } from './artist-sf-delete-dialog.component';
import { IArtistSf } from 'app/shared/model/artist-sf.model';

@Injectable({ providedIn: 'root' })
export class ArtistSfResolve implements Resolve<IArtistSf> {
  constructor(private service: ArtistSfService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArtistSf> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ArtistSf>) => response.ok),
        map((artist: HttpResponse<ArtistSf>) => artist.body)
      );
    }
    return of(new ArtistSf());
  }
}

export const artistRoute: Routes = [
  {
    path: '',
    component: ArtistSfComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArtistSfDetailComponent,
    resolve: {
      artist: ArtistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArtistSfUpdateComponent,
    resolve: {
      artist: ArtistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArtistSfUpdateComponent,
    resolve: {
      artist: ArtistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const artistPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArtistSfDeletePopupComponent,
    resolve: {
      artist: ArtistSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.artist.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
