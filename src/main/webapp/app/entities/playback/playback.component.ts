import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlayback } from 'app/shared/model/playback.model';
import { AccountService } from 'app/core/auth/account.service';
import { PlaybackService } from './playback.service';

@Component({
  selector: 'jhi-playback',
  templateUrl: './playback.component.html'
})
export class PlaybackComponent implements OnInit, OnDestroy {
  playbacks: IPlayback[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected playbackService: PlaybackService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.playbackService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlayback[]>) => res.ok),
        map((res: HttpResponse<IPlayback[]>) => res.body)
      )
      .subscribe(
        (res: IPlayback[]) => {
          this.playbacks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlaybacks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlayback) {
    return item.id;
  }

  registerChangeInPlaybacks() {
    this.eventSubscriber = this.eventManager.subscribe('playbackListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
