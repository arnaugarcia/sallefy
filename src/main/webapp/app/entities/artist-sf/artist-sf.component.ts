import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IArtistSf } from 'app/shared/model/artist-sf.model';
import { AccountService } from 'app/core';
import { ArtistSfService } from './artist-sf.service';

@Component({
  selector: 'jhi-artist-sf',
  templateUrl: './artist-sf.component.html'
})
export class ArtistSfComponent implements OnInit, OnDestroy {
  artists: IArtistSf[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected artistService: ArtistSfService,
    protected jhiAlertService: JhiAlertService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.artistService
      .query()
      .pipe(
        filter((res: HttpResponse<IArtistSf[]>) => res.ok),
        map((res: HttpResponse<IArtistSf[]>) => res.body)
      )
      .subscribe(
        (res: IArtistSf[]) => {
          this.artists = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArtists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArtistSf) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInArtists() {
    this.eventSubscriber = this.eventManager.subscribe('artistListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
