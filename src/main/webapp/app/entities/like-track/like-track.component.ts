import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';
import { LikeTrackDeleteDialogComponent } from './like-track-delete-dialog.component';

@Component({
  selector: 'jhi-like-track',
  templateUrl: './like-track.component.html'
})
export class LikeTrackComponent implements OnInit, OnDestroy {
  likeTracks?: ILikeTrack[];
  eventSubscriber?: Subscription;

  constructor(protected likeTrackService: LikeTrackService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.likeTrackService.query().subscribe((res: HttpResponse<ILikeTrack[]>) => {
      this.likeTracks = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLikeTracks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILikeTrack): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInLikeTracks(): void {
    this.eventSubscriber = this.eventManager.subscribe('likeTrackListModification', () => this.loadAll());
  }

  delete(likeTrack: ILikeTrack): void {
    const modalRef = this.modalService.open(LikeTrackDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.likeTrack = likeTrack;
  }
}
