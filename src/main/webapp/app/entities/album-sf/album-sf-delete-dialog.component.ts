import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from './album-sf.service';

@Component({
  selector: 'jhi-album-sf-delete-dialog',
  templateUrl: './album-sf-delete-dialog.component.html'
})
export class AlbumSfDeleteDialogComponent {
  album: IAlbumSf;

  constructor(protected albumService: AlbumSfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.albumService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'albumListModification',
        content: 'Deleted an album'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-album-sf-delete-popup',
  template: ''
})
export class AlbumSfDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ album }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(AlbumSfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.album = album;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/album-sf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/album-sf', { outlets: { popup: null } }]);
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
