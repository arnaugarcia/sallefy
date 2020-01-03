import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlayback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';

@Component({
  templateUrl: './playback-delete-dialog.component.html'
})
export class PlaybackDeleteDialogComponent {
  playback?: IPlayback;

  constructor(protected playbackService: PlaybackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.playbackService.delete(id).subscribe(() => {
      this.eventManager.broadcast('playbackListModification');
      this.activeModal.close();
    });
  }
}
