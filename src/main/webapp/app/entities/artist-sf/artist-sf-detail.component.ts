import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IArtistSf } from 'app/shared/model/artist-sf.model';

@Component({
  selector: 'jhi-artist-sf-detail',
  templateUrl: './artist-sf-detail.component.html'
})
export class ArtistSfDetailComponent implements OnInit {
  artist: IArtistSf;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ artist }) => {
      this.artist = artist;
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
