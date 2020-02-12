import { Component, ElementRef, OnInit } from '@angular/core';
import { GenreService } from 'app/shared/services/genre.service';
import { IGenre } from 'app/shared/model/genre.model';
import { HttpResponse } from '@angular/common/http';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { Subscription } from 'rxjs';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';

@Component({
  selector: 'sf-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, WidgetBase {
  genres: IGenre[] | null = [];
  private widgetReloaded$: Subscription = new Subscription();

  constructor(private elementRef: ElementRef, private genreService: GenreService, private widgetsService: WidgetsService) {}

  ngOnInit(): void {
    this.loadAll();

    this.widgetReloaded$ = this.widgetsService.reloadWidget$.subscribe((widgetSelector: string) => {
      if (this.hasTheSelector(widgetSelector)) {
        this.reload();
      }
    });
  }

  private hasTheSelector(widgetSelector: string): boolean {
    return this.elementRef.nativeElement.tagName === widgetSelector.toUpperCase();
  }

  public reload(): void {
    console.warn('Reloaded genres widget');
    this.loadAll();
  }

  private loadAll(): void {
    this.genreService.query().subscribe((response: HttpResponse<IGenre[]>) => {
      this.genres = response.body;
    });
  }
}
