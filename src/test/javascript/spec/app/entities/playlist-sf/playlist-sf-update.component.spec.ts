/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistSfUpdateComponent } from 'app/entities/playlist-sf/playlist-sf-update.component';
import { PlaylistSfService } from 'app/entities/playlist-sf/playlist-sf.service';
import { PlaylistSf } from 'app/shared/model/playlist-sf.model';

describe('Component Tests', () => {
  describe('PlaylistSf Management Update Component', () => {
    let comp: PlaylistSfUpdateComponent;
    let fixture: ComponentFixture<PlaylistSfUpdateComponent>;
    let service: PlaylistSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistSfUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaylistSfUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaylistSfUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistSfService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PlaylistSf(123);
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
        const entity = new PlaylistSf();
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
