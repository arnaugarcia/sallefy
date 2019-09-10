import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from './track-sf.service';

@Component({
  selector: 'jhi-track-sf-delete-dialog',
  templateUrl: './track-sf-delete-dialog.component.html'
})
export class TrackSfDeleteDialogComponent {
  track: ITrackSf;

  constructor(protected trackService: TrackSfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.trackService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'trackListModification',
        content: 'Deleted an track'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-track-sf-delete-popup',
  template: ''
})
export class TrackSfDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ track }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TrackSfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.track = track;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/track-sf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/track-sf', { outlets: { popup: null } }]);
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
