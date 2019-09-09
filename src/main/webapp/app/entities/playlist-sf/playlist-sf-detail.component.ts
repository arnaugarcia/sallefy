import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';

@Component({
  selector: 'jhi-playlist-sf-detail',
  templateUrl: './playlist-sf-detail.component.html'
})
export class PlaylistSfDetailComponent implements OnInit {
  playlist: IPlaylistSf;

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
