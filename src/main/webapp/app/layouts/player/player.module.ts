import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from 'app/layouts/player/player.component';
import { VgControlsModule } from 'videogular2/compiled/src/controls/controls';
import { VgBufferingModule } from 'videogular2/compiled/src/buffering/buffering';
import { VgOverlayPlayModule } from 'videogular2/compiled/src/overlay-play/overlay-play';
import { VgCoreModule } from 'videogular2/compiled/src/core/core';
import { PlayerPlaylistComponent } from './player-playlist/player-playlist.component';

@NgModule({
  declarations: [PlayerComponent, PlayerPlaylistComponent],
  imports: [CommonModule, VgCoreModule, VgControlsModule, VgOverlayPlayModule, VgBufferingModule],
  exports: [PlayerComponent]
})
export class SallefyPlayerModule {}
