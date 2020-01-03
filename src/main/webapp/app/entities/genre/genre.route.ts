import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGenre, Genre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';
import { GenreComponent } from './genre.component';
import { GenreDetailComponent } from './genre-detail.component';
import { GenreUpdateComponent } from './genre-update.component';

@Injectable({ providedIn: 'root' })
export class GenreResolve implements Resolve<IGenre> {
  constructor(private service: GenreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenre> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((genre: HttpResponse<Genre>) => {
          if (genre.body) {
            return of(genre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Genre());
  }
}

export const genreRoute: Routes = [
  {
    path: '',
    component: GenreComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.genre.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GenreDetailComponent,
    resolve: {
      genre: GenreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.genre.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GenreUpdateComponent,
    resolve: {
      genre: GenreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.genre.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GenreUpdateComponent,
    resolve: {
      genre: GenreResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.genre.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
