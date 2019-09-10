import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILikeAlbum } from 'app/shared/model/like-album.model';
import { AccountService } from 'app/core';
import { LikeAlbumService } from './like-album.service';

@Component({
  selector: 'jhi-like-album',
  templateUrl: './like-album.component.html'
})
export class LikeAlbumComponent implements OnInit, OnDestroy {
  likeAlbums: ILikeAlbum[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected likeAlbumService: LikeAlbumService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.likeAlbumService
      .query()
      .pipe(
        filter((res: HttpResponse<ILikeAlbum[]>) => res.ok),
        map((res: HttpResponse<ILikeAlbum[]>) => res.body)
      )
      .subscribe(
        (res: ILikeAlbum[]) => {
          this.likeAlbums = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLikeAlbums();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILikeAlbum) {
    return item.id;
  }

  registerChangeInLikeAlbums() {
    this.eventSubscriber = this.eventManager.subscribe('likeAlbumListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
