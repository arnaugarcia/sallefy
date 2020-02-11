import { Component, ElementRef, OnInit } from '@angular/core';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { Subscription } from 'rxjs';
import { GenreService } from 'app/shared/services/genre.service';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/shared/services/track.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sf-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.scss']
})
export class TopTracksComponent implements OnInit, WidgetBase {
  private tracks: ITrack[] | null = [];
  private widgetReloaded$: Subscription = new Subscription();

  constructor(
    private elementRef: ElementRef,
    private genreService: GenreService,
    private widgetsService: WidgetsService,
    private trackService: TrackService
  ) {}

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
    this.loadAll();
  }

  private loadAll(): void {
    this.trackService.query({ liked: true, recent: true, played: true, size: 10 }).subscribe((response: HttpResponse<ITrack[]>) => {
      this.tracks = response.body;
    });
  }
}
