import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';
import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';
import { ITrack, Track } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  public api: VgAPI | undefined;
  public tracks: ITrack[] = [];
  public currentTrack: ITrack = new Track();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.queue$.subscribe((tracks: ITrack[]) => {
      this.tracks = tracks;
      if (this.tracks.length !== 0) {
        this.currentTrack = this.tracks[0];
        this.playCurrentLoadedTrack();
      }
    });
  }

  showPlaylist(): void {
    this.playerService.playlistOpen(true);
  }

  onPlayerReady(api: VgAPI): void {
    this.api = api;
  }

  playCurrentLoadedTrack(): void {
    if (this.api) this.api.play();
  }

  ngAfterViewInit(): void {}
}
