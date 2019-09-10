/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { LikeUserComponent } from 'app/entities/like-user/like-user.component';
import { LikeUserService } from 'app/entities/like-user/like-user.service';
import { LikeUser } from 'app/shared/model/like-user.model';

describe('Component Tests', () => {
  describe('LikeUser Management Component', () => {
    let comp: LikeUserComponent;
    let fixture: ComponentFixture<LikeUserComponent>;
    let service: LikeUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeUserComponent],
        providers: []
      })
        .overrideTemplate(LikeUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
