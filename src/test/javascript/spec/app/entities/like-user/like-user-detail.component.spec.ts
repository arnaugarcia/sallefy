/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { LikeUserDetailComponent } from 'app/entities/like-user/like-user-detail.component';
import { LikeUser } from 'app/shared/model/like-user.model';

describe('Component Tests', () => {
  describe('LikeUser Management Detail Component', () => {
    let comp: LikeUserDetailComponent;
    let fixture: ComponentFixture<LikeUserDetailComponent>;
    const route = ({ data: of({ likeUser: new LikeUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LikeUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.likeUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
