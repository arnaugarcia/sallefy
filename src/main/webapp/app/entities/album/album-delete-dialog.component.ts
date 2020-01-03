import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';

@Component({
  templateUrl: './album-delete-dialog.component.html'
})
export class AlbumDeleteDialogComponent {
  album?: IAlbum;

  constructor(protected albumService: AlbumService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.albumService.delete(id).subscribe(() => {
      this.eventManager.broadcast('albumListModification');
      this.activeModal.close();
    });
  }
}
