import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlbum } from 'app/shared/model/album.model';
import { AccountService } from 'app/core/auth/account.service';
import { AlbumService } from './album.service';

@Component({
  selector: 'jhi-album',
  templateUrl: './album.component.html'
})
export class AlbumComponent implements OnInit, OnDestroy {
  albums: IAlbum[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected albumService: AlbumService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.albumService
      .query()
      .pipe(
        filter((res: HttpResponse<IAlbum[]>) => res.ok),
        map((res: HttpResponse<IAlbum[]>) => res.body)
      )
      .subscribe(
        (res: IAlbum[]) => {
          this.albums = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAlbums();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IAlbum) {
    return item.id;
  }

  registerChangeInAlbums() {
    this.eventSubscriber = this.eventManager.subscribe('albumListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
