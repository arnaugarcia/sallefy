import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';

@Component({
  templateUrl: './genre-delete-dialog.component.html'
})
export class GenreDeleteDialogComponent {
  genre?: IGenre;

  constructor(protected genreService: GenreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genreService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genreListModification');
      this.activeModal.close();
    });
  }
}
