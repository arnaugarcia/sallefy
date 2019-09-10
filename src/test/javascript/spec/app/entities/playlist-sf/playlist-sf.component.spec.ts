/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistSfComponent } from 'app/entities/playlist-sf/playlist-sf.component';
import { PlaylistSfService } from 'app/entities/playlist-sf/playlist-sf.service';
import { PlaylistSf } from 'app/shared/model/playlist-sf.model';

describe('Component Tests', () => {
  describe('PlaylistSf Management Component', () => {
    let comp: PlaylistSfComponent;
    let fixture: ComponentFixture<PlaylistSfComponent>;
    let service: PlaylistSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistSfComponent],
        providers: []
      })
        .overrideTemplate(PlaylistSfComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaylistSfComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaylistSfService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PlaylistSf(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.playlists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
