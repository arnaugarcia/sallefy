/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { TrackSfUpdateComponent } from 'app/entities/track-sf/track-sf-update.component';
import { TrackSfService } from 'app/entities/track-sf/track-sf.service';
import { TrackSf } from 'app/shared/model/track-sf.model';

describe('Component Tests', () => {
  describe('TrackSf Management Update Component', () => {
    let comp: TrackSfUpdateComponent;
    let fixture: ComponentFixture<TrackSfUpdateComponent>;
    let service: TrackSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [TrackSfUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TrackSfUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackSfUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackSfService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrackSf(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TrackSf();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
