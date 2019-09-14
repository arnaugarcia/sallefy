import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITrack } from 'app/shared/model/track.model';
import { AccountService } from 'app/core/auth/account.service';
import { TrackService } from './track.service';

@Component({
  selector: 'jhi-track',
  templateUrl: './track.component.html'
})
export class TrackComponent implements OnInit, OnDestroy {
  tracks: ITrack[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected trackService: TrackService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.trackService
      .query()
      .pipe(
        filter((res: HttpResponse<ITrack[]>) => res.ok),
        map((res: HttpResponse<ITrack[]>) => res.body)
      )
      .subscribe(
        (res: ITrack[]) => {
          this.tracks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTracks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITrack) {
    return item.id;
  }

  registerChangeInTracks() {
    this.eventSubscriber = this.eventManager.subscribe('trackListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
