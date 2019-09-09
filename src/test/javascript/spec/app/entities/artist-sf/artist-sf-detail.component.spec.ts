/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { ArtistSfDetailComponent } from 'app/entities/artist-sf/artist-sf-detail.component';
import { ArtistSf } from 'app/shared/model/artist-sf.model';

describe('Component Tests', () => {
  describe('ArtistSf Management Detail Component', () => {
    let comp: ArtistSfDetailComponent;
    let fixture: ComponentFixture<ArtistSfDetailComponent>;
    const route = ({ data: of({ artist: new ArtistSf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [ArtistSfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ArtistSfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ArtistSfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.artist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
