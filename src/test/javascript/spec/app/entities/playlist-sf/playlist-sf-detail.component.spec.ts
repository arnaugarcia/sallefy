/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { PlaylistSfDetailComponent } from 'app/entities/playlist-sf/playlist-sf-detail.component';
import { PlaylistSf } from 'app/shared/model/playlist-sf.model';

describe('Component Tests', () => {
  describe('PlaylistSf Management Detail Component', () => {
    let comp: PlaylistSfDetailComponent;
    let fixture: ComponentFixture<PlaylistSfDetailComponent>;
    const route = ({ data: of({ playlist: new PlaylistSf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [PlaylistSfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PlaylistSfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PlaylistSfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.playlist).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
