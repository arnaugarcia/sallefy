import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { FollowPlaylistComponent } from './follow-playlist.component';
import { FollowPlaylistDetailComponent } from './follow-playlist-detail.component';
import { FollowPlaylistUpdateComponent } from './follow-playlist-update.component';
import { FollowPlaylistDeletePopupComponent, FollowPlaylistDeleteDialogComponent } from './follow-playlist-delete-dialog.component';
import { followPlaylistRoute, followPlaylistPopupRoute } from './follow-playlist.route';

const ENTITY_STATES = [...followPlaylistRoute, ...followPlaylistPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FollowPlaylistComponent,
    FollowPlaylistDetailComponent,
    FollowPlaylistUpdateComponent,
    FollowPlaylistDeleteDialogComponent,
    FollowPlaylistDeletePopupComponent
  ],
  entryComponents: [
    FollowPlaylistComponent,
    FollowPlaylistUpdateComponent,
    FollowPlaylistDeleteDialogComponent,
    FollowPlaylistDeletePopupComponent
  ]
})
export class SallefyFollowPlaylistModule {}
