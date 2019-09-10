import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';

@Component({
  selector: 'jhi-like-track-delete-dialog',
  templateUrl: './like-track-delete-dialog.component.html'
})
export class LikeTrackDeleteDialogComponent {
  likeTrack: ILikeTrack;

  constructor(protected likeTrackService: LikeTrackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.likeTrackService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'likeTrackListModification',
        content: 'Deleted an likeTrack'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-like-track-delete-popup',
  template: ''
})
export class LikeTrackDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ likeTrack }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LikeTrackDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.likeTrack = likeTrack;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/like-track', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/like-track', { outlets: { popup: null } }]);
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
