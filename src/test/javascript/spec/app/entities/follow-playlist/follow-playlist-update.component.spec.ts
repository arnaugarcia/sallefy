import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { FollowPlaylistUpdateComponent } from 'app/entities/follow-playlist/follow-playlist-update.component';
import { FollowPlaylistService } from 'app/entities/follow-playlist/follow-playlist.service';
import { FollowPlaylist } from 'app/shared/model/follow-playlist.model';

describe('Component Tests', () => {
  describe('FollowPlaylist Management Update Component', () => {
    let comp: FollowPlaylistUpdateComponent;
    let fixture: ComponentFixture<FollowPlaylistUpdateComponent>;
    let service: FollowPlaylistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowPlaylistUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FollowPlaylistUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FollowPlaylistUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowPlaylistService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FollowPlaylist(123);
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
        const entity = new FollowPlaylist();
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
