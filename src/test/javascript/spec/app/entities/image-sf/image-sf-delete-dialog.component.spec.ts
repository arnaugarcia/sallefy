/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { ImageSfDeleteDialogComponent } from 'app/entities/image-sf/image-sf-delete-dialog.component';
import { ImageSfService } from 'app/entities/image-sf/image-sf.service';

describe('Component Tests', () => {
  describe('ImageSf Management Delete Component', () => {
    let comp: ImageSfDeleteDialogComponent;
    let fixture: ComponentFixture<ImageSfDeleteDialogComponent>;
    let service: ImageSfService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [ImageSfDeleteDialogComponent]
      })
        .overrideTemplate(ImageSfDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageSfDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageSfService);
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
