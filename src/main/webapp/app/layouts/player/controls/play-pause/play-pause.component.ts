import { Component, Input } from '@angular/core';
import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';

@Component({
  selector: 'sf-play-pause',
  templateUrl: './play-pause.component.html'
})
export class PlayPauseComponent {
  @Input()
  public playerApi: VgAPI = new VgAPI();
}
