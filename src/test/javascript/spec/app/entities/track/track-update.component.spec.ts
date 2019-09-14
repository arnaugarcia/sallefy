import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { TrackUpdateComponent } from 'app/entities/track/track-update.component';
import { TrackService } from 'app/entities/track/track.service';
import { Track } from 'app/shared/model/track.model';

describe('Component Tests', () => {
  describe('Track Management Update Component', () => {
    let comp: TrackUpdateComponent;
    let fixture: ComponentFixture<TrackUpdateComponent>;
    let service: TrackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [TrackUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TrackUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Track(123);
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
        const entity = new Track();
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
