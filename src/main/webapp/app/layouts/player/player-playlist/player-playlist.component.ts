import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';
import { OverlayService } from 'app/layouts/main/overlay.service';
import { VgAPI } from 'videogular2/compiled/src/core/services/vg-api';
import { ITrack } from 'app/shared/model/track.model';

@Component({
  selector: 'sf-player-playlist',
  templateUrl: './player-playlist.component.html',
  styleUrls: ['./player-playlist.component.scss']
})
export class PlayerPlaylistComponent implements OnInit {
  @Input()
  public playerApi: VgAPI | undefined;
  showPlaylist = false;
  public currentTrack: ITrack | undefined;

  constructor(private playerService: PlayerService, private overlayService: OverlayService) {}

  ngOnInit(): void {
    this.playerService.playlistOpenStatus.subscribe((playerOpen: boolean) => {
      this.showPlaylist = playerOpen;
      this.overlayService.changeStatus(playerOpen);
    });
    this.overlayService.overlayClicked.subscribe(() => {
      this.playerService.playlistOpen(false);
      this.overlayService.changeStatus(false);
    });
    this.playerService.currentTrack$.subscribe((currentTrack: ITrack) => {
      this.currentTrack = currentTrack;
    });
  }

  closePlaylist(): void {
    this.playerService.playlistOpen(false);
  }
}
