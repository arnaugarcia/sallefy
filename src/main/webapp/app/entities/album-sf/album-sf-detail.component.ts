import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlbumSf } from 'app/shared/model/album-sf.model';

@Component({
  selector: 'jhi-album-sf-detail',
  templateUrl: './album-sf-detail.component.html'
})
export class AlbumSfDetailComponent implements OnInit {
  album: IAlbumSf;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.album = album;
    });
  }

  previousState() {
    window.history.back();
  }
}
