import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFollowUser } from 'app/shared/model/follow-user.model';
import { AccountService } from 'app/core/auth/account.service';
import { FollowUserService } from './follow-user.service';

@Component({
  selector: 'jhi-follow-user',
  templateUrl: './follow-user.component.html'
})
export class FollowUserComponent implements OnInit, OnDestroy {
  followUsers: IFollowUser[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected followUserService: FollowUserService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.followUserService
      .query()
      .pipe(
        filter((res: HttpResponse<IFollowUser[]>) => res.ok),
        map((res: HttpResponse<IFollowUser[]>) => res.body)
      )
      .subscribe(
        (res: IFollowUser[]) => {
          this.followUsers = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFollowUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFollowUser) {
    return item.id;
  }

  registerChangeInFollowUsers() {
    this.eventSubscriber = this.eventManager.subscribe('followUserListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
