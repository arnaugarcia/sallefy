import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';

@Component({
  selector: 'jhi-follow-playlist-detail',
  templateUrl: './follow-playlist-detail.component.html'
})
export class FollowPlaylistDetailComponent implements OnInit {
  followPlaylist: IFollowPlaylist | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ followPlaylist }) => {
      this.followPlaylist = followPlaylist;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
