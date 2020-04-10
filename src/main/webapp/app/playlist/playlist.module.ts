import { NgModule } from '@angular/core';
import { PlaylistComponent } from './playlist.component';
import { PlaylistDetailComponent } from './playlist-detail/playlist-detail.component';
import { RouterModule } from '@angular/router';
import { playlistRoute } from 'app/playlist/playlist.route';
import { SallefySharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [PlaylistComponent, PlaylistDetailComponent],
  imports: [SallefySharedModule, RouterModule.forChild(playlistRoute)]
})
export class SallefyPlaylistModule {}
