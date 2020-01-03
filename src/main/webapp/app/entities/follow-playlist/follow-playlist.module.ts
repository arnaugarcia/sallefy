import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { FollowPlaylistComponent } from './follow-playlist.component';
import { FollowPlaylistDetailComponent } from './follow-playlist-detail.component';
import { FollowPlaylistUpdateComponent } from './follow-playlist-update.component';
import { FollowPlaylistDeleteDialogComponent } from './follow-playlist-delete-dialog.component';
import { followPlaylistRoute } from './follow-playlist.route';

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(followPlaylistRoute)],
  declarations: [
    FollowPlaylistComponent,
    FollowPlaylistDetailComponent,
    FollowPlaylistUpdateComponent,
    FollowPlaylistDeleteDialogComponent
  ],
  entryComponents: [FollowPlaylistDeleteDialogComponent]
})
export class SallefyFollowPlaylistModule {}
