import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';
import { ITrack } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit {
  public tracks: ITrack[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.queue$.subscribe((tracks: ITrack[]) => {
      this.tracks = tracks;
    });
  }
}
