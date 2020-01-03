import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';

@Component({
  templateUrl: './follow-user-delete-dialog.component.html'
})
export class FollowUserDeleteDialogComponent {
  followUser?: IFollowUser;

  constructor(
    protected followUserService: FollowUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.followUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('followUserListModification');
      this.activeModal.close();
    });
  }
}
