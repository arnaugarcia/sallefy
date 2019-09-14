import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { PlaybackComponent } from './playback.component';
import { PlaybackDetailComponent } from './playback-detail.component';
import { PlaybackUpdateComponent } from './playback-update.component';
import { PlaybackDeletePopupComponent, PlaybackDeleteDialogComponent } from './playback-delete-dialog.component';
import { playbackRoute, playbackPopupRoute } from './playback.route';

const ENTITY_STATES = [...playbackRoute, ...playbackPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaybackComponent,
    PlaybackDetailComponent,
    PlaybackUpdateComponent,
    PlaybackDeleteDialogComponent,
    PlaybackDeletePopupComponent
  ],
  entryComponents: [PlaybackComponent, PlaybackUpdateComponent, PlaybackDeleteDialogComponent, PlaybackDeletePopupComponent]
})
export class SallefyPlaybackModule {}
