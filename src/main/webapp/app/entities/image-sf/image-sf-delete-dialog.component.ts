import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImageSf } from 'app/shared/model/image-sf.model';
import { ImageSfService } from './image-sf.service';

@Component({
  selector: 'jhi-image-sf-delete-dialog',
  templateUrl: './image-sf-delete-dialog.component.html'
})
export class ImageSfDeleteDialogComponent {
  image: IImageSf;

  constructor(protected imageService: ImageSfService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.imageService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'imageListModification',
        content: 'Deleted an image'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-image-sf-delete-popup',
  template: ''
})
export class ImageSfDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ image }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ImageSfDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.image = image;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/image-sf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/image-sf', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
