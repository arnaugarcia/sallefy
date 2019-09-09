import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IImageSf } from 'app/shared/model/image-sf.model';
import { AccountService } from 'app/core';
import { ImageSfService } from './image-sf.service';

@Component({
  selector: 'jhi-image-sf',
  templateUrl: './image-sf.component.html'
})
export class ImageSfComponent implements OnInit, OnDestroy {
  images: IImageSf[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected imageService: ImageSfService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.imageService
      .query()
      .pipe(
        filter((res: HttpResponse<IImageSf[]>) => res.ok),
        map((res: HttpResponse<IImageSf[]>) => res.body)
      )
      .subscribe(
        (res: IImageSf[]) => {
          this.images = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInImages();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IImageSf) {
    return item.id;
  }

  registerChangeInImages() {
    this.eventSubscriber = this.eventManager.subscribe('imageListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
