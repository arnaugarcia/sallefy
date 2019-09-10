/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { LikeAlbumComponent } from 'app/entities/like-album/like-album.component';
import { LikeAlbumService } from 'app/entities/like-album/like-album.service';
import { LikeAlbum } from 'app/shared/model/like-album.model';

describe('Component Tests', () => {
  describe('LikeAlbum Management Component', () => {
    let comp: LikeAlbumComponent;
    let fixture: ComponentFixture<LikeAlbumComponent>;
    let service: LikeAlbumService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeAlbumComponent],
        providers: []
      })
        .overrideTemplate(LikeAlbumComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeAlbumComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeAlbumService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeAlbum(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeAlbums[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
