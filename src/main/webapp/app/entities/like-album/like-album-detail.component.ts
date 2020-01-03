import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILikeAlbum } from 'app/shared/model/like-album.model';

@Component({
  selector: 'jhi-like-album-detail',
  templateUrl: './like-album-detail.component.html'
})
export class LikeAlbumDetailComponent implements OnInit {
  likeAlbum: ILikeAlbum | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ likeAlbum }) => {
      this.likeAlbum = likeAlbum;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
