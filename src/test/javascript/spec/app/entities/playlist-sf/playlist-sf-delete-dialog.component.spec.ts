/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistSfDeleteDialogComponent } from 'app/entities/playlist-sf/playlist-sf-delete-dialog.component';
import { PlaylistSfService } from 'app/entities/playlist-sf/playlist-sf.service';

describe('Component Tests', () => {
  describe('PlaylistSf Management Delete Component', () => {
    let comp: PlaylistSfDeleteDialogComponent;
    let fixture: ComponentFixture<PlaylistSfDeleteDialogComponent>;
    let service: PlaylistSfService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistSfDeleteDialogComponent]
      })
        .overrideTemplate(PlaylistSfDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaylistSfDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistSfService);
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
