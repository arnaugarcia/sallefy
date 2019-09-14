import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { LikeTrackComponent } from 'app/entities/like-track/like-track.component';
import { LikeTrackService } from 'app/entities/like-track/like-track.service';
import { LikeTrack } from 'app/shared/model/like-track.model';

describe('Component Tests', () => {
  describe('LikeTrack Management Component', () => {
    let comp: LikeTrackComponent;
    let fixture: ComponentFixture<LikeTrackComponent>;
    let service: LikeTrackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeTrackComponent],
        providers: []
      })
        .overrideTemplate(LikeTrackComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeTrackComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeTrackService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeTrack(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeTracks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
