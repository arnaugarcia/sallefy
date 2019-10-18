import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';

@Component({
  selector: 'sf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  constructor(private playerService: PlayerService) {}

  ngOnInit() {}

  showPlaylist() {
    this.playerService.playlistOpen(true);
  }
}
