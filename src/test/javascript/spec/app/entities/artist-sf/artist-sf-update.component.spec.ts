/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { ArtistSfUpdateComponent } from 'app/entities/artist-sf/artist-sf-update.component';
import { ArtistSfService } from 'app/entities/artist-sf/artist-sf.service';
import { ArtistSf } from 'app/shared/model/artist-sf.model';

describe('Component Tests', () => {
  describe('ArtistSf Management Update Component', () => {
    let comp: ArtistSfUpdateComponent;
    let fixture: ComponentFixture<ArtistSfUpdateComponent>;
    let service: ArtistSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [ArtistSfUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ArtistSfUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArtistSfUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArtistSfService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ArtistSf(123);
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
        const entity = new ArtistSf();
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
