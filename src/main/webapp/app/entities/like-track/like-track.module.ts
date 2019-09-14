import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { LikeTrackComponent } from './like-track.component';
import { LikeTrackDetailComponent } from './like-track-detail.component';
import { LikeTrackUpdateComponent } from './like-track-update.component';
import { LikeTrackDeletePopupComponent, LikeTrackDeleteDialogComponent } from './like-track-delete-dialog.component';
import { likeTrackRoute, likeTrackPopupRoute } from './like-track.route';

const ENTITY_STATES = [...likeTrackRoute, ...likeTrackPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    LikeTrackComponent,
    LikeTrackDetailComponent,
    LikeTrackUpdateComponent,
    LikeTrackDeleteDialogComponent,
    LikeTrackDeletePopupComponent
  ],
  entryComponents: [LikeTrackComponent, LikeTrackUpdateComponent, LikeTrackDeleteDialogComponent, LikeTrackDeletePopupComponent]
})
export class SallefyLikeTrackModule {}
