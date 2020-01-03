import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';

@Component({
  templateUrl: './like-track-delete-dialog.component.html'
})
export class LikeTrackDeleteDialogComponent {
  likeTrack?: ILikeTrack;

  constructor(protected likeTrackService: LikeTrackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.likeTrackService.delete(id).subscribe(() => {
      this.eventManager.broadcast('likeTrackListModification');
      this.activeModal.close();
    });
  }
}
