import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { GenreUpdateComponent } from 'app/entities/genre/genre-update.component';
import { GenreService } from 'app/entities/genre/genre.service';
import { Genre } from 'app/shared/model/genre.model';

describe('Component Tests', () => {
  describe('Genre Management Update Component', () => {
    let comp: GenreUpdateComponent;
    let fixture: ComponentFixture<GenreUpdateComponent>;
    let service: GenreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [GenreUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GenreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Genre(123);
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
        const entity = new Genre();
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
