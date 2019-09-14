import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlayback } from 'app/shared/model/playback.model';

@Component({
  selector: 'jhi-playback-detail',
  templateUrl: './playback-detail.component.html'
})
export class PlaybackDetailComponent implements OnInit {
  playback: IPlayback;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playback }) => {
      this.playback = playback;
    });
  }

  previousState() {
    window.history.back();
  }
}
