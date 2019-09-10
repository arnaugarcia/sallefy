import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILikeUser } from 'app/shared/model/like-user.model';
import { LikeUserService } from './like-user.service';

@Component({
  selector: 'jhi-like-user-delete-dialog',
  templateUrl: './like-user-delete-dialog.component.html'
})
export class LikeUserDeleteDialogComponent {
  likeUser: ILikeUser;

  constructor(protected likeUserService: LikeUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.likeUserService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'likeUserListModification',
        content: 'Deleted an likeUser'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-like-user-delete-popup',
  template: ''
})
export class LikeUserDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ likeUser }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LikeUserDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.likeUser = likeUser;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/like-user', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/like-user', { outlets: { popup: null } }]);
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
