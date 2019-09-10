import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  LikeAlbumComponent,
  LikeAlbumDetailComponent,
  LikeAlbumUpdateComponent,
  LikeAlbumDeletePopupComponent,
  LikeAlbumDeleteDialogComponent,
  likeAlbumRoute,
  likeAlbumPopupRoute
} from './';

const ENTITY_STATES = [...likeAlbumRoute, ...likeAlbumPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LikeAlbumComponent,
    LikeAlbumDetailComponent,
    LikeAlbumUpdateComponent,
    LikeAlbumDeleteDialogComponent,
    LikeAlbumDeletePopupComponent
  ],
  entryComponents: [LikeAlbumComponent, LikeAlbumUpdateComponent, LikeAlbumDeleteDialogComponent, LikeAlbumDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyLikeAlbumModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
