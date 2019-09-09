/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { ImageSfComponent } from 'app/entities/image-sf/image-sf.component';
import { ImageSfService } from 'app/entities/image-sf/image-sf.service';
import { ImageSf } from 'app/shared/model/image-sf.model';

describe('Component Tests', () => {
  describe('ImageSf Management Component', () => {
    let comp: ImageSfComponent;
    let fixture: ComponentFixture<ImageSfComponent>;
    let service: ImageSfService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [ImageSfComponent],
        providers: []
      })
        .overrideTemplate(ImageSfComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ImageSfComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ImageSfService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ImageSf(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.images[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
