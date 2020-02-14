import { NgModule } from '@angular/core';
import { PlayerComponent } from 'app/layouts/player/player.component';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { PlayerPlaylistComponent } from './player-playlist/player-playlist.component';
import { SallefySharedModule } from 'app/shared/shared.module';
import { TrackListComponent } from './player-playlist/track-list/track-list.component';
import { TrackComponent } from './player-playlist/track/track.component';
import { PlayPauseComponent } from './controls/play-pause/play-pause.component';

@NgModule({
  declarations: [PlayerComponent, PlayerPlaylistComponent, TrackListComponent, TrackComponent, PlayPauseComponent],
  imports: [SallefySharedModule, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  exports: [PlayerComponent]
})
export class SallefyPlayerModule {}
