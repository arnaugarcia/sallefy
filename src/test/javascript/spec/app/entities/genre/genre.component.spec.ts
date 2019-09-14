import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { GenreComponent } from 'app/entities/genre/genre.component';
import { GenreService } from 'app/entities/genre/genre.service';
import { Genre } from 'app/shared/model/genre.model';

describe('Component Tests', () => {
  describe('Genre Management Component', () => {
    let comp: GenreComponent;
    let fixture: ComponentFixture<GenreComponent>;
    let service: GenreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [GenreComponent],
        providers: []
      })
        .overrideTemplate(GenreComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenreComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenreService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Genre(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.genres[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
