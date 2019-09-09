import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  ArtistSfComponent,
  ArtistSfDetailComponent,
  ArtistSfUpdateComponent,
  ArtistSfDeletePopupComponent,
  ArtistSfDeleteDialogComponent,
  artistRoute,
  artistPopupRoute
} from './';

const ENTITY_STATES = [...artistRoute, ...artistPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ArtistSfComponent,
    ArtistSfDetailComponent,
    ArtistSfUpdateComponent,
    ArtistSfDeleteDialogComponent,
    ArtistSfDeletePopupComponent
  ],
  entryComponents: [ArtistSfComponent, ArtistSfUpdateComponent, ArtistSfDeleteDialogComponent, ArtistSfDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyArtistSfModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
