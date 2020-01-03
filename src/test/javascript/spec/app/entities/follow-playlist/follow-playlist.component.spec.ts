import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { FollowPlaylistComponent } from 'app/entities/follow-playlist/follow-playlist.component';
import { FollowPlaylistService } from 'app/entities/follow-playlist/follow-playlist.service';
import { FollowPlaylist } from 'app/shared/model/follow-playlist.model';

describe('Component Tests', () => {
  describe('FollowPlaylist Management Component', () => {
    let comp: FollowPlaylistComponent;
    let fixture: ComponentFixture<FollowPlaylistComponent>;
    let service: FollowPlaylistService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowPlaylistComponent],
        providers: []
      })
        .overrideTemplate(FollowPlaylistComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FollowPlaylistComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowPlaylistService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FollowPlaylist(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.followPlaylists && comp.followPlaylists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
