/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { AlbumSfDetailComponent } from 'app/entities/album-sf/album-sf-detail.component';
import { AlbumSf } from 'app/shared/model/album-sf.model';

describe('Component Tests', () => {
  describe('AlbumSf Management Detail Component', () => {
    let comp: AlbumSfDetailComponent;
    let fixture: ComponentFixture<AlbumSfDetailComponent>;
    const route = ({ data: of({ album: new AlbumSf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [AlbumSfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AlbumSfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AlbumSfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.album).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
