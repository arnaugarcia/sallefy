import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'jhi-playlist-delete-dialog',
  templateUrl: './playlist-delete-dialog.component.html'
})
export class PlaylistDeleteDialogComponent {
  playlist: IPlaylist;

  constructor(protected playlistService: PlaylistService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

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
  selector: 'jhi-playlist-delete-popup',
  template: ''
})
export class PlaylistDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlaylistDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.playlist = playlist;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/playlist', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/playlist', { outlets: { popup: null } }]);
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
