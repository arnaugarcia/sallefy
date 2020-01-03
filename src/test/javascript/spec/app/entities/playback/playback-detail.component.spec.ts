import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { PlaybackDetailComponent } from 'app/entities/playback/playback-detail.component';
import { Playback } from 'app/shared/model/playback.model';

describe('Component Tests', () => {
  describe('Playback Management Detail Component', () => {
    let comp: PlaybackDetailComponent;
    let fixture: ComponentFixture<PlaybackDetailComponent>;
    const route = ({ data: of({ playback: new Playback(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaybackDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaybackDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaybackDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load playback on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playback).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
