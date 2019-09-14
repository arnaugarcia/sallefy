import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGenre } from 'app/shared/model/genre.model';
import { AccountService } from 'app/core/auth/account.service';
import { GenreService } from './genre.service';

@Component({
  selector: 'jhi-genre',
  templateUrl: './genre.component.html'
})
export class GenreComponent implements OnInit, OnDestroy {
  genres: IGenre[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected genreService: GenreService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.genreService
      .query()
      .pipe(
        filter((res: HttpResponse<IGenre[]>) => res.ok),
        map((res: HttpResponse<IGenre[]>) => res.body)
      )
      .subscribe(
        (res: IGenre[]) => {
          this.genres = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInGenres();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IGenre) {
    return item.id;
  }

  registerChangeInGenres() {
    this.eventSubscriber = this.eventManager.subscribe('genreListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
