import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';

@Component({
  selector: 'jhi-genre-delete-dialog',
  templateUrl: './genre-delete-dialog.component.html'
})
export class GenreDeleteDialogComponent {
  genre: IGenre;

  constructor(protected genreService: GenreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.genreService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'genreListModification',
        content: 'Deleted an genre'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-genre-delete-popup',
  template: ''
})
export class GenreDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ genre }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GenreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.genre = genre;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/genre', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/genre', { outlets: { popup: null } }]);
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
