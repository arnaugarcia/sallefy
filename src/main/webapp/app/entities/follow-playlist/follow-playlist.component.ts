import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { AccountService } from 'app/core/auth/account.service';
import { FollowPlaylistService } from './follow-playlist.service';

@Component({
  selector: 'jhi-follow-playlist',
  templateUrl: './follow-playlist.component.html'
})
export class FollowPlaylistComponent implements OnInit, OnDestroy {
  followPlaylists: IFollowPlaylist[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected followPlaylistService: FollowPlaylistService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.followPlaylistService
      .query()
      .pipe(
        filter((res: HttpResponse<IFollowPlaylist[]>) => res.ok),
        map((res: HttpResponse<IFollowPlaylist[]>) => res.body)
      )
      .subscribe(
        (res: IFollowPlaylist[]) => {
          this.followPlaylists = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFollowPlaylists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFollowPlaylist) {
    return item.id;
  }

  registerChangeInFollowPlaylists() {
    this.eventSubscriber = this.eventManager.subscribe('followPlaylistListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
