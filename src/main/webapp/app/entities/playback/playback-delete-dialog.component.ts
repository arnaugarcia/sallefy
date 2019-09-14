import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';

@Component({
  selector: 'jhi-playback-delete-dialog',
  templateUrl: './playback-delete-dialog.component.html'
})
export class PlaybackDeleteDialogComponent {
  playback: IPlayback;

  constructor(protected playbackService: PlaybackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.playbackService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'playbackListModification',
        content: 'Deleted an playback'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-playback-delete-popup',
  template: ''
})
export class PlaybackDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playback }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaybackDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.playback = playback;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/playback', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/playback', { outlets: { popup: null } }]);
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
