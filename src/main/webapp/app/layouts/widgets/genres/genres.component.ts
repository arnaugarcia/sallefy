import { Component, OnInit } from '@angular/core';
import { GenreService } from 'app/shared/services/genre.service';
import { IGenre } from 'app/shared/model/genre.model';
import { HttpResponse } from '@angular/common/http';
import { WidgetBase } from 'app/layouts/widgets/widget-base';

@Component({
  selector: 'sf-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, WidgetBase {
  genres: IGenre[] | null = [];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    console.warn('Init genres component');
    this.loadAll();
  }

  reload(): void {
    console.warn('Reload genres component');
    this.loadAll();
  }

  private loadAll(): void {
    this.genreService.query().subscribe((response: HttpResponse<IGenre[]>) => {
      this.genres = response.body;
    });
  }
}
