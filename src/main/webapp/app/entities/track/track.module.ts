import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { TrackComponent } from './track.component';
import { TrackDetailComponent } from './track-detail.component';
import { TrackUpdateComponent } from './track-update.component';
import { TrackDeleteDialogComponent } from './track-delete-dialog.component';
import { trackRoute } from './track.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(trackRoute)],
  declarations: [TrackComponent, TrackDetailComponent, TrackUpdateComponent, TrackDeleteDialogComponent],
  entryComponents: [TrackDeleteDialogComponent]
})
export class SallefyTrackModule {}
