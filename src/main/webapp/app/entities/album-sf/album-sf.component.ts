import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAlbumSf } from 'app/shared/model/album-sf.model';
import { AccountService } from 'app/core';
import { AlbumSfService } from './album-sf.service';

@Component({
  selector: 'jhi-album-sf',
  templateUrl: './album-sf.component.html'
})
export class AlbumSfComponent implements OnInit, OnDestroy {
  albums: IAlbumSf[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected albumService: AlbumSfService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.albumService
      .query()
      .pipe(
        filter((res: HttpResponse<IAlbumSf[]>) => res.ok),
        map((res: HttpResponse<IAlbumSf[]>) => res.body)
      )
      .subscribe(
        (res: IAlbumSf[]) => {
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

  trackId(index: number, item: IAlbumSf) {
    return item.id;
  }

  registerChangeInAlbums() {
    this.eventSubscriber = this.eventManager.subscribe('albumListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
