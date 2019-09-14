import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SallefyTestModule } from '../../../test.module';
import { FollowUserComponent } from 'app/entities/follow-user/follow-user.component';
import { FollowUserService } from 'app/entities/follow-user/follow-user.service';
import { FollowUser } from 'app/shared/model/follow-user.model';

describe('Component Tests', () => {
  describe('FollowUser Management Component', () => {
    let comp: FollowUserComponent;
    let fixture: ComponentFixture<FollowUserComponent>;
    let service: FollowUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowUserComponent],
        providers: []
      })
        .overrideTemplate(FollowUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FollowUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FollowUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.followUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
