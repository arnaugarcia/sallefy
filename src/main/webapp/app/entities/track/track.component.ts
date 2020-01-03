import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from './track.service';
import { TrackDeleteDialogComponent } from './track-delete-dialog.component';

@Component({
  selector: 'jhi-track',
  templateUrl: './track.component.html'
})
export class TrackComponent implements OnInit, OnDestroy {
  tracks?: ITrack[];
  eventSubscriber?: Subscription;

  constructor(protected trackService: TrackService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.trackService.query().subscribe((res: HttpResponse<ITrack[]>) => {
      this.tracks = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTracks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITrack): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTracks(): void {
    this.eventSubscriber = this.eventManager.subscribe('trackListModification', () => this.loadAll());
  }

  delete(track: ITrack): void {
    const modalRef = this.modalService.open(TrackDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.track = track;
  }
}
