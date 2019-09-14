import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { TrackComponent } from './track.component';
import { TrackDetailComponent } from './track-detail.component';
import { TrackUpdateComponent } from './track-update.component';
import { TrackDeletePopupComponent, TrackDeleteDialogComponent } from './track-delete-dialog.component';
import { trackRoute, trackPopupRoute } from './track.route';

const ENTITY_STATES = [...trackRoute, ...trackPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TrackComponent, TrackDetailComponent, TrackUpdateComponent, TrackDeleteDialogComponent, TrackDeletePopupComponent],
  entryComponents: [TrackComponent, TrackUpdateComponent, TrackDeleteDialogComponent, TrackDeletePopupComponent]
})
export class SallefyTrackModule {}
