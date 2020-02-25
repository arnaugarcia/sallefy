import { Component, Input, OnInit } from '@angular/core';
import { ITrack } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  @Input()
  public track: ITrack | undefined;

  constructor() {}

  ngOnInit(): void {}
}
