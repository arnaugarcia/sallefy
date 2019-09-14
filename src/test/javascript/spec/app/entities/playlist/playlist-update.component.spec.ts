import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistUpdateComponent } from 'app/entities/playlist/playlist-update.component';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { Playlist } from 'app/shared/model/playlist.model';

describe('Component Tests', () => {
  describe('Playlist Management Update Component', () => {
    let comp: PlaylistUpdateComponent;
    let fixture: ComponentFixture<PlaylistUpdateComponent>;
    let service: PlaylistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PlaylistUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaylistUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Playlist(123);
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
        const entity = new Playlist();
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
