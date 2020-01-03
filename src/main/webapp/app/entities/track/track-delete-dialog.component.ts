import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from './track.service';

@Component({
  templateUrl: './track-delete-dialog.component.html'
})
export class TrackDeleteDialogComponent {
  track?: ITrack;

  constructor(protected trackService: TrackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trackService.delete(id).subscribe(() => {
      this.eventManager.broadcast('trackListModification');
      this.activeModal.close();
    });
  }
}
