import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';

@Component({
  templateUrl: './follow-playlist-delete-dialog.component.html'
})
export class FollowPlaylistDeleteDialogComponent {
  followPlaylist?: IFollowPlaylist;

  constructor(
    protected followPlaylistService: FollowPlaylistService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.followPlaylistService.delete(id).subscribe(() => {
      this.eventManager.broadcast('followPlaylistListModification');
      this.activeModal.close();
    });
  }
}
