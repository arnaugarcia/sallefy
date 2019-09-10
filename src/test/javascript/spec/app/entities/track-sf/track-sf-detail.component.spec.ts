/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { TrackSfDetailComponent } from 'app/entities/track-sf/track-sf-detail.component';
import { TrackSf } from 'app/shared/model/track-sf.model';

describe('Component Tests', () => {
  describe('TrackSf Management Detail Component', () => {
    let comp: TrackSfDetailComponent;
    let fixture: ComponentFixture<TrackSfDetailComponent>;
    const route = ({ data: of({ track: new TrackSf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [TrackSfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TrackSfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TrackSfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.track).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
