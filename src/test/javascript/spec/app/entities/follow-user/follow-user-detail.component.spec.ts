/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { FollowUserDetailComponent } from 'app/entities/follow-user/follow-user-detail.component';
import { FollowUser } from 'app/shared/model/follow-user.model';

describe('Component Tests', () => {
  describe('FollowUser Management Detail Component', () => {
    let comp: FollowUserDetailComponent;
    let fixture: ComponentFixture<FollowUserDetailComponent>;
    const route = ({ data: of({ followUser: new FollowUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FollowUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FollowUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.followUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
