import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';

@Component({
  selector: 'jhi-like-album-delete-dialog',
  templateUrl: './like-album-delete-dialog.component.html'
})
export class LikeAlbumDeleteDialogComponent {
  likeAlbum: ILikeAlbum;

  constructor(protected likeAlbumService: LikeAlbumService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.likeAlbumService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'likeAlbumListModification',
        content: 'Deleted an likeAlbum'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-like-album-delete-popup',
  template: ''
})
export class LikeAlbumDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ likeAlbum }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(LikeAlbumDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.likeAlbum = likeAlbum;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/like-album', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/like-album', { outlets: { popup: null } }]);
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
