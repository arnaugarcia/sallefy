import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from 'app/shared/services/playlist.service';
import { HttpResponse } from '@angular/common/http';
import { IFollow } from 'app/shared/model/follow.model';
import { PlayerService } from 'app/layouts/player/player.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sf-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.scss']
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  public playlist: IPlaylist = new Playlist();
  public currentUser: Account | undefined;
  private accountSubscription: Subscription = new Subscription();

  constructor(
    protected activatedRoute: ActivatedRoute,
    private playlistService: PlaylistService,
    private playerService: PlayerService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.playlist = playlist;
    });
    this.accountSubscription = this.accountService.identity().subscribe((account: Account | null) => {
      if (account) {
        this.currentUser = account;
      }
    });
  }

  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
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

  hasTracks(): boolean | undefined {
    return this.playlist.tracks && this.playlist.tracks.length !== 0;
  }

  currentUserIsTheOwner(): boolean {
    if (!this.playlist.owner || !this.currentUser) {
      return false;
    }
    return this.playlist.owner.login === this.currentUser.login;
  }
}
