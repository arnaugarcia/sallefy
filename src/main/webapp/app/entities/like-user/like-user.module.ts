import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  LikeUserComponent,
  LikeUserDetailComponent,
  LikeUserUpdateComponent,
  LikeUserDeletePopupComponent,
  LikeUserDeleteDialogComponent,
  likeUserRoute,
  likeUserPopupRoute
} from './';

const ENTITY_STATES = [...likeUserRoute, ...likeUserPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LikeUserComponent,
    LikeUserDetailComponent,
    LikeUserUpdateComponent,
    LikeUserDeleteDialogComponent,
    LikeUserDeletePopupComponent
  ],
  entryComponents: [LikeUserComponent, LikeUserUpdateComponent, LikeUserDeleteDialogComponent, LikeUserDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyLikeUserModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
