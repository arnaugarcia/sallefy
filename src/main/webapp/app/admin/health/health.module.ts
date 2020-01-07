import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SallefySharedModule } from 'app/shared/shared.module';

import { SfHealthComponent } from './health.component';
import { SfHealthModalComponent } from './health-modal.component';

import { healthRoute } from './health.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild([healthRoute])],
  declarations: [SfHealthComponent, SfHealthModalComponent],
  entryComponents: [SfHealthModalComponent]
})
export class SfHealthModule {}
