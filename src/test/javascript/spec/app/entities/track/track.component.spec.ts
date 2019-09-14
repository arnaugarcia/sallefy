import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { TrackComponent } from 'app/entities/track/track.component';
import { TrackService } from 'app/entities/track/track.service';
import { Track } from 'app/shared/model/track.model';

describe('Component Tests', () => {
  describe('Track Management Component', () => {
    let comp: TrackComponent;
    let fixture: ComponentFixture<TrackComponent>;
    let service: TrackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [TrackComponent],
        providers: []
      })
        .overrideTemplate(TrackComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrackComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrackService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Track(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tracks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
