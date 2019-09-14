import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistDetailComponent } from 'app/entities/playlist/playlist-detail.component';
import { Playlist } from 'app/shared/model/playlist.model';

describe('Component Tests', () => {
  describe('Playlist Management Detail Component', () => {
    let comp: PlaylistDetailComponent;
    let fixture: ComponentFixture<PlaylistDetailComponent>;
    const route = ({ data: of({ playlist: new Playlist(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaylistDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaylistDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playlist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
