import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistDeleteDialogComponent } from 'app/entities/playlist/playlist-delete-dialog.component';
import { PlaylistService } from 'app/entities/playlist/playlist.service';

describe('Component Tests', () => {
  describe('Playlist Management Delete Component', () => {
    let comp: PlaylistDeleteDialogComponent;
    let fixture: ComponentFixture<PlaylistDeleteDialogComponent>;
    let service: PlaylistService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistDeleteDialogComponent]
      })
        .overrideTemplate(PlaylistDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaylistDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistService);
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
