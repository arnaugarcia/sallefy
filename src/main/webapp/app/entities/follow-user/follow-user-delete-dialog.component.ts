import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';

@Component({
  selector: 'jhi-follow-user-delete-dialog',
  templateUrl: './follow-user-delete-dialog.component.html'
})
export class FollowUserDeleteDialogComponent {
  followUser: IFollowUser;

  constructor(
    protected followUserService: FollowUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.followUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'followUserListModification',
        content: 'Deleted an followUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-follow-user-delete-popup',
  template: ''
})
export class FollowUserDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ followUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FollowUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.followUser = followUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/follow-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/follow-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
