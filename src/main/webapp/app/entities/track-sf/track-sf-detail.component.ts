import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrackSf } from 'app/shared/model/track-sf.model';

@Component({
  selector: 'jhi-track-sf-detail',
  templateUrl: './track-sf-detail.component.html'
})
export class TrackSfDetailComponent implements OnInit {
  track: ITrackSf;

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
