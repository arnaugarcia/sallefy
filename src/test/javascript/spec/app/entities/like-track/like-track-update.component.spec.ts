/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { LikeTrackUpdateComponent } from 'app/entities/like-track/like-track-update.component';
import { LikeTrackService } from 'app/entities/like-track/like-track.service';
import { LikeTrack } from 'app/shared/model/like-track.model';

describe('Component Tests', () => {
  describe('LikeTrack Management Update Component', () => {
    let comp: LikeTrackUpdateComponent;
    let fixture: ComponentFixture<LikeTrackUpdateComponent>;
    let service: LikeTrackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeTrackUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LikeTrackUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeTrackUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeTrackService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LikeTrack(123);
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
        const entity = new LikeTrack();
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
