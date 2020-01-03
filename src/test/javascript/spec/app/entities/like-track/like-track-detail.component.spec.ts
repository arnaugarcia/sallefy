import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { LikeTrackDetailComponent } from 'app/entities/like-track/like-track-detail.component';
import { LikeTrack } from 'app/shared/model/like-track.model';

describe('Component Tests', () => {
  describe('LikeTrack Management Detail Component', () => {
    let comp: LikeTrackDetailComponent;
    let fixture: ComponentFixture<LikeTrackDetailComponent>;
    const route = ({ data: of({ likeTrack: new LikeTrack(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeTrackDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LikeTrackDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeTrackDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load likeTrack on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.likeTrack).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
