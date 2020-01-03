import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';
import { FollowUserDeleteDialogComponent } from './follow-user-delete-dialog.component';

@Component({
  selector: 'jhi-follow-user',
  templateUrl: './follow-user.component.html'
})
export class FollowUserComponent implements OnInit, OnDestroy {
  followUsers?: IFollowUser[];
  eventSubscriber?: Subscription;

  constructor(protected followUserService: FollowUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.followUserService.query().subscribe((res: HttpResponse<IFollowUser[]>) => {
      this.followUsers = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFollowUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFollowUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFollowUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('followUserListModification', () => this.loadAll());
  }

  delete(followUser: IFollowUser): void {
    const modalRef = this.modalService.open(FollowUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.followUser = followUser;
  }
}
