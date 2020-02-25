import { Component, Input, OnInit } from '@angular/core';
import { ITrack, Track } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input()
  public track: ITrack = new Track();

  constructor() {}

  ngOnInit(): void {}
}
