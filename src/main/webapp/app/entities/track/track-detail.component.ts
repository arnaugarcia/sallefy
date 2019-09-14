import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrack } from 'app/shared/model/track.model';

@Component({
  selector: 'jhi-track-detail',
  templateUrl: './track-detail.component.html'
})
export class TrackDetailComponent implements OnInit {
  track: ITrack;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ track }) => {
      this.track = track;
    });
  }

  previousState() {
    window.history.back();
  }
}
