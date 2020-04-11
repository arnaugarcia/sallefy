import { Component, OnInit } from '@angular/core';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'app/shared/services/playlist.service';
import { HttpResponse } from '@angular/common/http';
import { IFollow } from 'app/shared/model/follow.model';
import { PlayerService } from 'app/layouts/player/player.service';

@Component({
  selector: 'sf-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  public playlist: IPlaylist = new Playlist();

  constructor(protected activatedRoute: ActivatedRoute, private playlistService: PlaylistService, private playerService: PlayerService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.playlist = playlist;
    });
  }

  toggleFollowPlaylist(): void {
    this.playlistService.follow(this.playlist).subscribe((response: HttpResponse<IFollow>) => {
      if (response.ok && response.body) {
        this.playlist.followed = response.body.followed;
      }
    });
  }

  play(): void {
    this.playerService.playPlaylist(this.playlist);
  }

  getTotalSongsDuration(): number {
    if (!this.playlist.tracks) {
      return 0;
    }
    return Math.floor(this.playlist.tracks.reduce((total, track) => (total += track.duration ? track.duration : 0), 0) / 60);
  }
}
