import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';
import { LikeAlbumDeleteDialogComponent } from './like-album-delete-dialog.component';

@Component({
  selector: 'jhi-like-album',
  templateUrl: './like-album.component.html'
})
export class LikeAlbumComponent implements OnInit, OnDestroy {
  likeAlbums?: ILikeAlbum[];
  eventSubscriber?: Subscription;

  constructor(protected likeAlbumService: LikeAlbumService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.likeAlbumService.query().subscribe((res: HttpResponse<ILikeAlbum[]>) => {
      this.likeAlbums = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLikeAlbums();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILikeAlbum): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLikeAlbums(): void {
    this.eventSubscriber = this.eventManager.subscribe('likeAlbumListModification', () => this.loadAll());
  }

  delete(likeAlbum: ILikeAlbum): void {
    const modalRef = this.modalService.open(LikeAlbumDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.likeAlbum = likeAlbum;
  }
}
