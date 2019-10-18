import { Component, OnInit } from '@angular/core';
import { GenreService } from 'app/shared/services/genre.service';
import { IGenre } from 'app/shared/model/genre.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sf-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  genres: IGenre[] = [];

  constructor(private genreService: GenreService) {}

  ngOnInit() {
    this.genreService.query().subscribe((response: HttpResponse<IGenre[]>) => {
      this.genres = response.body;
    });
  }
}
