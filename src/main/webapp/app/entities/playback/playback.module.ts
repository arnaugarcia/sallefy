import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { PlaybackComponent } from './playback.component';
import { PlaybackDetailComponent } from './playback-detail.component';
import { PlaybackUpdateComponent } from './playback-update.component';
import { PlaybackDeleteDialogComponent } from './playback-delete-dialog.component';
import { playbackRoute } from './playback.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(playbackRoute)],
  declarations: [PlaybackComponent, PlaybackDetailComponent, PlaybackUpdateComponent, PlaybackDeleteDialogComponent],
  entryComponents: [PlaybackDeleteDialogComponent]
})
export class SallefyPlaybackModule {}
