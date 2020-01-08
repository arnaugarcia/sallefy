import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from '../../shared/services/playlist.service';

@Component({
  templateUrl: './playlist-delete-dialog.component.html'
})
export class PlaylistDeleteDialogComponent {
  playlist?: IPlaylist;

  constructor(protected playlistService: PlaylistService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.playlistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('playlistListModification');
      this.activeModal.close();
    });
  }
}
