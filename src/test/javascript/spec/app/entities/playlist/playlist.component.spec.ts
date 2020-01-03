import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistComponent } from 'app/entities/playlist/playlist.component';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { Playlist } from 'app/shared/model/playlist.model';

describe('Component Tests', () => {
  describe('Playlist Management Component', () => {
    let comp: PlaylistComponent;
    let fixture: ComponentFixture<PlaylistComponent>;
    let service: PlaylistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistComponent],
        providers: []
      })
        .overrideTemplate(PlaylistComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaylistComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Playlist(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.playlists && comp.playlists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
