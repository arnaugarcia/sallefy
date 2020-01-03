import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPlayback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';
import { PlaybackDeleteDialogComponent } from './playback-delete-dialog.component';

@Component({
  selector: 'jhi-playback',
  templateUrl: './playback.component.html'
})
export class PlaybackComponent implements OnInit, OnDestroy {
  playbacks?: IPlayback[];
  eventSubscriber?: Subscription;

  constructor(protected playbackService: PlaybackService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.playbackService.query().subscribe((res: HttpResponse<IPlayback[]>) => {
      this.playbacks = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPlaybacks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPlayback): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPlaybacks(): void {
    this.eventSubscriber = this.eventManager.subscribe('playbackListModification', () => this.loadAll());
  }

  delete(playback: IPlayback): void {
    const modalRef = this.modalService.open(PlaybackDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.playback = playback;
  }
}
