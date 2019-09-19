import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';

@Component({
  selector: 'jhi-follow-playlist-delete-dialog',
  templateUrl: './follow-playlist-delete-dialog.component.html'
})
export class FollowPlaylistDeleteDialogComponent {
  followPlaylist: IFollowPlaylist;

  constructor(
    protected followPlaylistService: FollowPlaylistService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.followPlaylistService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'followPlaylistListModification',
        content: 'Deleted an followPlaylist'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-follow-playlist-delete-popup',
  template: ''
})
export class FollowPlaylistDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ followPlaylist }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FollowPlaylistDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.followPlaylist = followPlaylist;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/follow-playlist', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/follow-playlist', { outlets: { popup: null } }]);
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
