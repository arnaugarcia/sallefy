import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenre } from 'app/shared/model/genre.model';

@Component({
  selector: 'jhi-genre-detail',
  templateUrl: './genre-detail.component.html'
})
export class GenreDetailComponent implements OnInit {
  genre: IGenre;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ genre }) => {
      this.genre = genre;
    });
  }

  previousState() {
    window.history.back();
  }
}
