/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { LikeUserUpdateComponent } from 'app/entities/like-user/like-user-update.component';
import { LikeUserService } from 'app/entities/like-user/like-user.service';
import { LikeUser } from 'app/shared/model/like-user.model';

describe('Component Tests', () => {
  describe('LikeUser Management Update Component', () => {
    let comp: LikeUserUpdateComponent;
    let fixture: ComponentFixture<LikeUserUpdateComponent>;
    let service: LikeUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [LikeUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LikeUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LikeUser(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LikeUser();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
