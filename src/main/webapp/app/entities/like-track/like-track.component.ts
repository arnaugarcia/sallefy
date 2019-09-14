import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILikeTrack } from 'app/shared/model/like-track.model';
import { AccountService } from 'app/core/auth/account.service';
import { LikeTrackService } from './like-track.service';

@Component({
  selector: 'jhi-like-track',
  templateUrl: './like-track.component.html'
})
export class LikeTrackComponent implements OnInit, OnDestroy {
  likeTracks: ILikeTrack[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected likeTrackService: LikeTrackService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.likeTrackService
      .query()
      .pipe(
        filter((res: HttpResponse<ILikeTrack[]>) => res.ok),
        map((res: HttpResponse<ILikeTrack[]>) => res.body)
      )
      .subscribe(
        (res: ILikeTrack[]) => {
          this.likeTracks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLikeTracks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILikeTrack) {
    return item.id;
  }

  registerChangeInLikeTracks() {
    this.eventSubscriber = this.eventManager.subscribe('likeTrackListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
