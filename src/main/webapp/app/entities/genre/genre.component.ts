import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';
import { GenreDeleteDialogComponent } from './genre-delete-dialog.component';

@Component({
  selector: 'jhi-genre',
  templateUrl: './genre.component.html'
})
export class GenreComponent implements OnInit, OnDestroy {
  genres?: IGenre[];
  eventSubscriber?: Subscription;

  constructor(protected genreService: GenreService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.genreService.query().subscribe((res: HttpResponse<IGenre[]>) => {
      this.genres = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenres();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGenre): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGenres(): void {
    this.eventSubscriber = this.eventManager.subscribe('genreListModification', () => this.loadAll());
  }

  delete(genre: IGenre): void {
    const modalRef = this.modalService.open(GenreDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genre = genre;
  }
}
