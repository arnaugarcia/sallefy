/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { AlbumSfUpdateComponent } from 'app/entities/album-sf/album-sf-update.component';
import { AlbumSfService } from 'app/entities/album-sf/album-sf.service';
import { AlbumSf } from 'app/shared/model/album-sf.model';

describe('Component Tests', () => {
  describe('AlbumSf Management Update Component', () => {
    let comp: AlbumSfUpdateComponent;
    let fixture: ComponentFixture<AlbumSfUpdateComponent>;
    let service: AlbumSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [AlbumSfUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AlbumSfUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlbumSfUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlbumSfService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AlbumSf(123);
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
        const entity = new AlbumSf();
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
