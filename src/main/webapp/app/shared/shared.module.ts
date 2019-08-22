import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SallefySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [SallefySharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [SallefySharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SallefySharedModule {
  static forRoot() {
    return {
      ngModule: SallefySharedModule
    };
  }
}
