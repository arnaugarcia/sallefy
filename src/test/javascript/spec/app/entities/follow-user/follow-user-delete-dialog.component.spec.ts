/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { FollowUserDeleteDialogComponent } from 'app/entities/follow-user/follow-user-delete-dialog.component';
import { FollowUserService } from 'app/entities/follow-user/follow-user.service';

describe('Component Tests', () => {
  describe('FollowUser Management Delete Component', () => {
    let comp: FollowUserDeleteDialogComponent;
    let fixture: ComponentFixture<FollowUserDeleteDialogComponent>;
    let service: FollowUserService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowUserDeleteDialogComponent]
      })
        .overrideTemplate(FollowUserDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FollowUserDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowUserService);
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
