import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { SallefySharedModule } from 'app/shared';
import {
  ImageSfComponent,
  ImageSfDetailComponent,
  ImageSfUpdateComponent,
  ImageSfDeletePopupComponent,
  ImageSfDeleteDialogComponent,
  imageRoute,
  imagePopupRoute
} from './';

const ENTITY_STATES = [...imageRoute, ...imagePopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ImageSfComponent,
    ImageSfDetailComponent,
    ImageSfUpdateComponent,
    ImageSfDeleteDialogComponent,
    ImageSfDeletePopupComponent
  ],
  entryComponents: [ImageSfComponent, ImageSfUpdateComponent, ImageSfDeleteDialogComponent, ImageSfDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefyImageSfModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
