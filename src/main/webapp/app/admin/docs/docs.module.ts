import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SallefySharedModule } from 'app/shared/shared.module';

import { SfDocsComponent } from './docs.component';

import { docsRoute } from './docs.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild([docsRoute])],
  declarations: [SfDocsComponent]
})
export class DocsModule {}
