/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { ImageSfDetailComponent } from 'app/entities/image-sf/image-sf-detail.component';
import { ImageSf } from 'app/shared/model/image-sf.model';

describe('Component Tests', () => {
  describe('ImageSf Management Detail Component', () => {
    let comp: ImageSfDetailComponent;
    let fixture: ComponentFixture<ImageSfDetailComponent>;
    const route = ({ data: of({ image: new ImageSf(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [ImageSfDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ImageSfDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ImageSfDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.image).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
