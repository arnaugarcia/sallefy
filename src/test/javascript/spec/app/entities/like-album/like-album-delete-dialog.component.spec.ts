import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { LikeAlbumDeleteDialogComponent } from 'app/entities/like-album/like-album-delete-dialog.component';
import { LikeAlbumService } from 'app/entities/like-album/like-album.service';

describe('Component Tests', () => {
  describe('LikeAlbum Management Delete Component', () => {
    let comp: LikeAlbumDeleteDialogComponent;
    let fixture: ComponentFixture<LikeAlbumDeleteDialogComponent>;
    let service: LikeAlbumService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeAlbumDeleteDialogComponent]
      })
        .overrideTemplate(LikeAlbumDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeAlbumDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeAlbumService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
