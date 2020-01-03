import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistDetailComponent } from 'app/entities/playlist/playlist-detail.component';
import { Playlist } from 'app/shared/model/playlist.model';

describe('Component Tests', () => {
  describe('Playlist Management Detail Component', () => {
    let comp: PlaylistDetailComponent;
    let fixture: ComponentFixture<PlaylistDetailComponent>;
    let dataUtils: JhiDataUtils;
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
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load playlist on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playlist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
