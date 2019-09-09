/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { TrackSfDeleteDialogComponent } from 'app/entities/track-sf/track-sf-delete-dialog.component';
import { TrackSfService } from 'app/entities/track-sf/track-sf.service';

describe('Component Tests', () => {
  describe('TrackSf Management Delete Component', () => {
    let comp: TrackSfDeleteDialogComponent;
    let fixture: ComponentFixture<TrackSfDeleteDialogComponent>;
    let service: TrackSfService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [TrackSfDeleteDialogComponent]
      })
        .overrideTemplate(TrackSfDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrackSfDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackSfService);
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
