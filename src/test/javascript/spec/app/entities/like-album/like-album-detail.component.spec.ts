import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { LikeAlbumDetailComponent } from 'app/entities/like-album/like-album-detail.component';
import { LikeAlbum } from 'app/shared/model/like-album.model';

describe('Component Tests', () => {
  describe('LikeAlbum Management Detail Component', () => {
    let comp: LikeAlbumDetailComponent;
    let fixture: ComponentFixture<LikeAlbumDetailComponent>;
    const route = ({ data: of({ likeAlbum: new LikeAlbum(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeAlbumDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LikeAlbumDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeAlbumDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.likeAlbum).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
