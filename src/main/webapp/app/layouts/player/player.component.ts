import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';
import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';
import { ITrack } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  public api: VgAPI | undefined;
  public tracks: ITrack[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.queue$.subscribe((tracks: ITrack[]) => {
      this.tracks = tracks;
    });
  }

  showPlaylist(): void {
    this.playerService.playlistOpen(true);
  }

  onPlayerReady(api: VgAPI): void {
    this.api = api;
  }

  ngAfterViewInit(): void {}
}
