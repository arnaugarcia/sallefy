import { NgModule } from '@angular/core';
import { SallefySharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { SfAlertComponent } from './alert/alert.component';
import { SfAlertErrorComponent } from './alert/alert-error.component';
import { SfLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [SallefySharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, SfAlertComponent, SfAlertErrorComponent, SfLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [SfLoginModalComponent],
  exports: [
    SallefySharedLibsModule,
    FindLanguageFromKeyPipe,
    SfAlertComponent,
    SfAlertErrorComponent,
    SfLoginModalComponent,
    HasAnyAuthorityDirective
  ]
})
export class SallefySharedModule {}
