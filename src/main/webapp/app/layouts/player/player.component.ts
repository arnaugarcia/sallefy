import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';
import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';
import { ITrack, Track } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public api: VgAPI | undefined;
  public currentTrack: ITrack = new Track();
  public sources: ITrack[] = [];

  constructor(public playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService.currentTrack$.subscribe((track: ITrack) => {
      this.currentTrack = track;
      this.loadCurrentTrack();
    });
  }

  showPlaylist(): void {
    this.playerService.playlistOpen(true);
  }

  onPlayerReady(api: VgAPI): void {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe((value: any) => {
      this.play();
    });
  }

  play(): void {
    if (this.api) this.api.play();
  }

  loadCurrentTrack(): void {
    this.sources.splice(0, 1);
    this.sources.push(this.currentTrack);
  }
}
