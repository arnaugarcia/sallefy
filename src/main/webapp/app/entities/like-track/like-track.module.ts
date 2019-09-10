import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  LikeTrackComponent,
  LikeTrackDetailComponent,
  LikeTrackUpdateComponent,
  LikeTrackDeletePopupComponent,
  LikeTrackDeleteDialogComponent,
  likeTrackRoute,
  likeTrackPopupRoute
} from './';

const ENTITY_STATES = [...likeTrackRoute, ...likeTrackPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LikeTrackComponent,
    LikeTrackDetailComponent,
    LikeTrackUpdateComponent,
    LikeTrackDeleteDialogComponent,
    LikeTrackDeletePopupComponent
  ],
  entryComponents: [LikeTrackComponent, LikeTrackUpdateComponent, LikeTrackDeleteDialogComponent, LikeTrackDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyLikeTrackModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
