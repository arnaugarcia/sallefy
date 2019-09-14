import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { PlaybackComponent } from 'app/entities/playback/playback.component';
import { PlaybackService } from 'app/entities/playback/playback.service';
import { Playback } from 'app/shared/model/playback.model';

describe('Component Tests', () => {
  describe('Playback Management Component', () => {
    let comp: PlaybackComponent;
    let fixture: ComponentFixture<PlaybackComponent>;
    let service: PlaybackService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaybackComponent],
        providers: []
      })
        .overrideTemplate(PlaybackComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlaybackComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlaybackService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Playback(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.playbacks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
