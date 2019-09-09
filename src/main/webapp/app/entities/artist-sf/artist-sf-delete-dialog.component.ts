import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from './artist-sf.service';

@Component({
  selector: 'jhi-artist-sf-delete-dialog',
  templateUrl: './artist-sf-delete-dialog.component.html'
})
export class ArtistSfDeleteDialogComponent {
  artist: IArtistSf;

  constructor(protected artistService: ArtistSfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.artistService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'artistListModification',
        content: 'Deleted an artist'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-artist-sf-delete-popup',
  template: ''
})
export class ArtistSfDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ artist }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ArtistSfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.artist = artist;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/artist-sf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/artist-sf', { outlets: { popup: null } }]);
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
