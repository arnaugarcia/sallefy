/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { AlbumSfComponent } from 'app/entities/album-sf/album-sf.component';
import { AlbumSfService } from 'app/entities/album-sf/album-sf.service';
import { AlbumSf } from 'app/shared/model/album-sf.model';

describe('Component Tests', () => {
  describe('AlbumSf Management Component', () => {
    let comp: AlbumSfComponent;
    let fixture: ComponentFixture<AlbumSfComponent>;
    let service: AlbumSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [AlbumSfComponent],
        providers: []
      })
        .overrideTemplate(AlbumSfComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlbumSfComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlbumSfService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AlbumSf(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.albums[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
