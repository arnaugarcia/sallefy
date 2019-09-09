import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ImageSf } from 'app/shared/model/image-sf.model';
import { ImageSfService } from './image-sf.service';
import { ImageSfComponent } from './image-sf.component';
import { ImageSfDetailComponent } from './image-sf-detail.component';
import { ImageSfUpdateComponent } from './image-sf-update.component';
import { ImageSfDeletePopupComponent } from './image-sf-delete-dialog.component';
import { IImageSf } from 'app/shared/model/image-sf.model';

@Injectable({ providedIn: 'root' })
export class ImageSfResolve implements Resolve<IImageSf> {
  constructor(private service: ImageSfService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImageSf> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ImageSf>) => response.ok),
        map((image: HttpResponse<ImageSf>) => image.body)
      );
    }
    return of(new ImageSf());
  }
}

export const imageRoute: Routes = [
  {
    path: '',
    component: ImageSfComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImageSfDetailComponent,
    resolve: {
      image: ImageSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImageSfUpdateComponent,
    resolve: {
      image: ImageSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImageSfUpdateComponent,
    resolve: {
      image: ImageSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.image.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const imagePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ImageSfDeletePopupComponent,
    resolve: {
      image: ImageSfResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'sallefyApp.image.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
