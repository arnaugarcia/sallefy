import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ILikeUser } from 'app/shared/model/like-user.model';
import { AccountService } from 'app/core';
import { LikeUserService } from './like-user.service';

@Component({
  selector: 'jhi-like-user',
  templateUrl: './like-user.component.html'
})
export class LikeUserComponent implements OnInit, OnDestroy {
  likeUsers: ILikeUser[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected likeUserService: LikeUserService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.likeUserService
      .query()
      .pipe(
        filter((res: HttpResponse<ILikeUser[]>) => res.ok),
        map((res: HttpResponse<ILikeUser[]>) => res.body)
      )
      .subscribe(
        (res: ILikeUser[]) => {
          this.likeUsers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLikeUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILikeUser) {
    return item.id;
  }

  registerChangeInLikeUsers() {
    this.eventSubscriber = this.eventManager.subscribe('likeUserListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
