import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  TrackSfComponent,
  TrackSfDetailComponent,
  TrackSfUpdateComponent,
  TrackSfDeletePopupComponent,
  TrackSfDeleteDialogComponent,
  trackRoute,
  trackPopupRoute
} from './';

const ENTITY_STATES = [...trackRoute, ...trackPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TrackSfComponent,
    TrackSfDetailComponent,
    TrackSfUpdateComponent,
    TrackSfDeleteDialogComponent,
    TrackSfDeletePopupComponent
  ],
  entryComponents: [TrackSfComponent, TrackSfUpdateComponent, TrackSfDeleteDialogComponent, TrackSfDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyTrackSfModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
