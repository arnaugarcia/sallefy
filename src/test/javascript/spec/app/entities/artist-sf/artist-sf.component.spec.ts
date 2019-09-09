/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { ArtistSfComponent } from 'app/entities/artist-sf/artist-sf.component';
import { ArtistSfService } from 'app/entities/artist-sf/artist-sf.service';
import { ArtistSf } from 'app/shared/model/artist-sf.model';

describe('Component Tests', () => {
  describe('ArtistSf Management Component', () => {
    let comp: ArtistSfComponent;
    let fixture: ComponentFixture<ArtistSfComponent>;
    let service: ArtistSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [ArtistSfComponent],
        providers: []
      })
        .overrideTemplate(ArtistSfComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ArtistSfComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ArtistSfService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ArtistSf(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.artists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
