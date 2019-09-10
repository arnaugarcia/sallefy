/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { LikeTrackDeleteDialogComponent } from 'app/entities/like-track/like-track-delete-dialog.component';
import { LikeTrackService } from 'app/entities/like-track/like-track.service';

describe('Component Tests', () => {
  describe('LikeTrack Management Delete Component', () => {
    let comp: LikeTrackDeleteDialogComponent;
    let fixture: ComponentFixture<LikeTrackDeleteDialogComponent>;
    let service: LikeTrackService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeTrackDeleteDialogComponent]
      })
        .overrideTemplate(LikeTrackDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeTrackDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeTrackService);
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
