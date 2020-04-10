import { Component, OnInit } from '@angular/core';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sf-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit {
  public playlist: IPlaylist = new Playlist();

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.playlist = playlist;
    });
  }
}
