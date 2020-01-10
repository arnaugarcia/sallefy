import { NgModule } from '@angular/core';
import { SallefySharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { SfAlertComponent } from './alert/alert.component';
import { SfAlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [SallefySharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, SfAlertComponent, SfAlertErrorComponent, HasAnyAuthorityDirective],
  exports: [SallefySharedLibsModule, FindLanguageFromKeyPipe, SfAlertComponent, SfAlertErrorComponent, HasAnyAuthorityDirective]
})
export class SallefySharedModule {}
