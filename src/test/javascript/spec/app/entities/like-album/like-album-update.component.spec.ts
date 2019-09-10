/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { LikeAlbumUpdateComponent } from 'app/entities/like-album/like-album-update.component';
import { LikeAlbumService } from 'app/entities/like-album/like-album.service';
import { LikeAlbum } from 'app/shared/model/like-album.model';

describe('Component Tests', () => {
  describe('LikeAlbum Management Update Component', () => {
    let comp: LikeAlbumUpdateComponent;
    let fixture: ComponentFixture<LikeAlbumUpdateComponent>;
    let service: LikeAlbumService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeAlbumUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LikeAlbumUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeAlbumUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeAlbumService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LikeAlbum(123);
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
        const entity = new LikeAlbum();
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
