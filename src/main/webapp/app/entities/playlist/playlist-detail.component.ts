import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPlaylist } from 'app/shared/model/playlist.model';

@Component({
  selector: 'jhi-playlist-detail',
  templateUrl: './playlist-detail.component.html'
})
export class PlaylistDetailComponent implements OnInit {
  playlist: IPlaylist;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.playlist = playlist;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
