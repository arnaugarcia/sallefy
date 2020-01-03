import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { LikeTrackComponent } from './like-track.component';
import { LikeTrackDetailComponent } from './like-track-detail.component';
import { LikeTrackUpdateComponent } from './like-track-update.component';
import { LikeTrackDeleteDialogComponent } from './like-track-delete-dialog.component';
import { likeTrackRoute } from './like-track.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(likeTrackRoute)],
  declarations: [LikeTrackComponent, LikeTrackDetailComponent, LikeTrackUpdateComponent, LikeTrackDeleteDialogComponent],
  entryComponents: [LikeTrackDeleteDialogComponent]
})
export class SallefyLikeTrackModule {}
