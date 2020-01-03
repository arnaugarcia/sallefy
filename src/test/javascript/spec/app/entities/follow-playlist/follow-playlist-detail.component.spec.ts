import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { FollowPlaylistDetailComponent } from 'app/entities/follow-playlist/follow-playlist-detail.component';
import { FollowPlaylist } from 'app/shared/model/follow-playlist.model';

describe('Component Tests', () => {
  describe('FollowPlaylist Management Detail Component', () => {
    let comp: FollowPlaylistDetailComponent;
    let fixture: ComponentFixture<FollowPlaylistDetailComponent>;
    const route = ({ data: of({ followPlaylist: new FollowPlaylist(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowPlaylistDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FollowPlaylistDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FollowPlaylistDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load followPlaylist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.followPlaylist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
