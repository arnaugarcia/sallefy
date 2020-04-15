import { Component, Input } from '@angular/core';
import { TrackBaseComponent } from 'app/shared/component/track-base.component';

@Component({
  selector: 'sf-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent extends TrackBaseComponent {
  @Input()
  public index = 0;
}
