import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  AlbumSfComponent,
  AlbumSfDetailComponent,
  AlbumSfUpdateComponent,
  AlbumSfDeletePopupComponent,
  AlbumSfDeleteDialogComponent,
  albumRoute,
  albumPopupRoute
} from './';

const ENTITY_STATES = [...albumRoute, ...albumPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AlbumSfComponent,
    AlbumSfDetailComponent,
    AlbumSfUpdateComponent,
    AlbumSfDeleteDialogComponent,
    AlbumSfDeletePopupComponent
  ],
  entryComponents: [AlbumSfComponent, AlbumSfUpdateComponent, AlbumSfDeleteDialogComponent, AlbumSfDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyAlbumSfModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
