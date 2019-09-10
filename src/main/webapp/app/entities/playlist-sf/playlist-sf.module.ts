import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  PlaylistSfComponent,
  PlaylistSfDetailComponent,
  PlaylistSfUpdateComponent,
  PlaylistSfDeletePopupComponent,
  PlaylistSfDeleteDialogComponent,
  playlistRoute,
  playlistPopupRoute
} from './';

const ENTITY_STATES = [...playlistRoute, ...playlistPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaylistSfComponent,
    PlaylistSfDetailComponent,
    PlaylistSfUpdateComponent,
    PlaylistSfDeleteDialogComponent,
    PlaylistSfDeletePopupComponent
  ],
  entryComponents: [PlaylistSfComponent, PlaylistSfUpdateComponent, PlaylistSfDeleteDialogComponent, PlaylistSfDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyPlaylistSfModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
