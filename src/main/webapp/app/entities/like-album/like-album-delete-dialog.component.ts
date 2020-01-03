import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';

@Component({
  templateUrl: './like-album-delete-dialog.component.html'
})
export class LikeAlbumDeleteDialogComponent {
  likeAlbum?: ILikeAlbum;

  constructor(protected likeAlbumService: LikeAlbumService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.likeAlbumService.delete(id).subscribe(() => {
      this.eventManager.broadcast('likeAlbumListModification');
      this.activeModal.close();
    });
  }
}
