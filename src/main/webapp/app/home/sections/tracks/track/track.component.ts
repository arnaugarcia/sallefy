import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITrack, Track } from 'app/shared/model/track.model';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'sf-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input()
  public track: ITrack = new Track();

  public hover = false;

  @ViewChild(ContextMenuComponent, { static: true })
  public basicMenu: ContextMenuComponent | undefined;

  constructor() {}

  ngOnInit(): void {}

  play(track: ITrack): void {}

  showMessage(s: string): void {
    console.warn(s);
  }
}
