import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAlbum } from 'app/shared/model/album.model';

@Component({
  selector: 'jhi-album-detail',
  templateUrl: './album-detail.component.html'
})
export class AlbumDetailComponent implements OnInit {
  album: IAlbum | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      this.album = album;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
