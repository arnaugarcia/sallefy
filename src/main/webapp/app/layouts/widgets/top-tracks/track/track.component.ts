import { Component } from '@angular/core';
import { TrackBaseComponent } from 'app/shared/component/track-base.component';
import { PlayerService } from 'app/layouts/player/player.service';
import { TrackService } from 'app/shared/services/track.service';

@Component({
  selector: 'sf-track',
  templateUrl: 'track.component.html',
  styleUrls: ['track.component.scss']
})
export class TrackComponent extends TrackBaseComponent {
  constructor(playerService: PlayerService, trackService: TrackService) {
    super(playerService, trackService);
  }
}
