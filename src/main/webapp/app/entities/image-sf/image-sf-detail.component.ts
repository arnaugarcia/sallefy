import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImageSf } from 'app/shared/model/image-sf.model';

@Component({
  selector: 'jhi-image-sf-detail',
  templateUrl: './image-sf-detail.component.html'
})
export class ImageSfDetailComponent implements OnInit {
  image: IImageSf;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.image = image;
    });
  }

  previousState() {
    window.history.back();
  }
}
