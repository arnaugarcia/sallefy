/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { AlbumSfDeleteDialogComponent } from 'app/entities/album-sf/album-sf-delete-dialog.component';
import { AlbumSfService } from 'app/entities/album-sf/album-sf.service';

describe('Component Tests', () => {
  describe('AlbumSf Management Delete Component', () => {
    let comp: AlbumSfDeleteDialogComponent;
    let fixture: ComponentFixture<AlbumSfDeleteDialogComponent>;
    let service: AlbumSfService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [AlbumSfDeleteDialogComponent]
      })
        .overrideTemplate(AlbumSfDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlbumSfDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlbumSfService);
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
