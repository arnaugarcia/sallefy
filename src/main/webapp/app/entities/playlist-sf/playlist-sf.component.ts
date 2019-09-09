import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { AccountService } from 'app/core';
import { PlaylistSfService } from './playlist-sf.service';

@Component({
  selector: 'jhi-playlist-sf',
  templateUrl: './playlist-sf.component.html'
})
export class PlaylistSfComponent implements OnInit, OnDestroy {
  playlists: IPlaylistSf[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected playlistService: PlaylistSfService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.playlistService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlaylistSf[]>) => res.ok),
        map((res: HttpResponse<IPlaylistSf[]>) => res.body)
      )
      .subscribe(
        (res: IPlaylistSf[]) => {
          this.playlists = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaylists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlaylistSf) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPlaylists() {
    this.eventSubscriber = this.eventManager.subscribe('playlistListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
