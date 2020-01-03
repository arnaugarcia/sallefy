import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { PlaybackUpdateComponent } from 'app/entities/playback/playback-update.component';
import { PlaybackService } from 'app/entities/playback/playback.service';
import { Playback } from 'app/shared/model/playback.model';

describe('Component Tests', () => {
  describe('Playback Management Update Component', () => {
    let comp: PlaybackUpdateComponent;
    let fixture: ComponentFixture<PlaybackUpdateComponent>;
    let service: PlaybackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaybackUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaybackUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaybackUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaybackService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Playback(123);
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
        const entity = new Playback();
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
