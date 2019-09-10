import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  FollowUserComponent,
  FollowUserDetailComponent,
  FollowUserUpdateComponent,
  FollowUserDeletePopupComponent,
  FollowUserDeleteDialogComponent,
  followUserRoute,
  followUserPopupRoute
} from './';

const ENTITY_STATES = [...followUserRoute, ...followUserPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FollowUserComponent,
    FollowUserDetailComponent,
    FollowUserUpdateComponent,
    FollowUserDeleteDialogComponent,
    FollowUserDeletePopupComponent
  ],
  entryComponents: [FollowUserComponent, FollowUserUpdateComponent, FollowUserDeleteDialogComponent, FollowUserDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyFollowUserModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
