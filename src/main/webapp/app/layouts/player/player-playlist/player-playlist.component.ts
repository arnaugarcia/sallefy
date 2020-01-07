import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';
import { OverlayService } from 'app/layouts/main/overlay.service';

@Component({
  selector: 'sf-player-playlist',
  templateUrl: './player-playlist.component.html',
  styleUrls: ['./player-playlist.component.scss']
})
export class PlayerPlaylistComponent implements OnInit {
  showPlaylist = false;

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
  }

  closePlaylist(): void {
    this.playerService.playlistOpen(false);
  }
}
