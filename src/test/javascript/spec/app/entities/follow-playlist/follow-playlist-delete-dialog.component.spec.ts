import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { FollowPlaylistDeleteDialogComponent } from 'app/entities/follow-playlist/follow-playlist-delete-dialog.component';
import { FollowPlaylistService } from 'app/entities/follow-playlist/follow-playlist.service';

describe('Component Tests', () => {
  describe('FollowPlaylist Management Delete Component', () => {
    let comp: FollowPlaylistDeleteDialogComponent;
    let fixture: ComponentFixture<FollowPlaylistDeleteDialogComponent>;
    let service: FollowPlaylistService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowPlaylistDeleteDialogComponent]
      })
        .overrideTemplate(FollowPlaylistDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FollowPlaylistDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowPlaylistService);
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
