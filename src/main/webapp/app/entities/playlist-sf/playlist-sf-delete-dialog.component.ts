import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { PlaylistSfService } from './playlist-sf.service';

@Component({
  selector: 'jhi-playlist-sf-delete-dialog',
  templateUrl: './playlist-sf-delete-dialog.component.html'
})
export class PlaylistSfDeleteDialogComponent {
  playlist: IPlaylistSf;

  constructor(protected playlistService: PlaylistSfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.playlistService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'playlistListModification',
        content: 'Deleted an playlist'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-playlist-sf-delete-popup',
  template: ''
})
export class PlaylistSfDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaylistSfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.playlist = playlist;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/playlist-sf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/playlist-sf', { outlets: { popup: null } }]);
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
