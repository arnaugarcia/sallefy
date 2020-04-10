import { Component, OnInit } from '@angular/core';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'app/shared/services/playlist.service';
import { HttpResponse } from '@angular/common/http';
import { IFollow } from 'app/shared/model/follow.model';

@Component({
  selector: 'sf-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  public playlist: IPlaylist = new Playlist();

  constructor(protected activatedRoute: ActivatedRoute, private playlistService: PlaylistService) {}

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
}
