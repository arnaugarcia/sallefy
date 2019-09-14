import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SallefySharedModule } from 'app/shared/shared.module';
import { PlaylistComponent } from './playlist.component';
import { PlaylistDetailComponent } from './playlist-detail.component';
import { PlaylistUpdateComponent } from './playlist-update.component';
import { PlaylistDeletePopupComponent, PlaylistDeleteDialogComponent } from './playlist-delete-dialog.component';
import { playlistRoute, playlistPopupRoute } from './playlist.route';

const ENTITY_STATES = [...playlistRoute, ...playlistPopupRoute];

@NgModule({
  imports: [SallefySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlaylistComponent,
    PlaylistDetailComponent,
    PlaylistUpdateComponent,
    PlaylistDeleteDialogComponent,
    PlaylistDeletePopupComponent
  ],
  entryComponents: [PlaylistComponent, PlaylistUpdateComponent, PlaylistDeleteDialogComponent, PlaylistDeletePopupComponent]
})
export class SallefyPlaylistModule {}
