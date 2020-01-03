import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { GenreDetailComponent } from 'app/entities/genre/genre-detail.component';
import { Genre } from 'app/shared/model/genre.model';

describe('Component Tests', () => {
  describe('Genre Management Detail Component', () => {
    let comp: GenreDetailComponent;
    let fixture: ComponentFixture<GenreDetailComponent>;
    const route = ({ data: of({ genre: new Genre(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [GenreDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GenreDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenreDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load genre on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.genre).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
