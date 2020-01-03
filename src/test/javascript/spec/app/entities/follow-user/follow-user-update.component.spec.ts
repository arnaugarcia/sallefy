import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SallefyTestModule } from '../../../test.module';
import { FollowUserUpdateComponent } from 'app/entities/follow-user/follow-user-update.component';
import { FollowUserService } from 'app/entities/follow-user/follow-user.service';
import { FollowUser } from 'app/shared/model/follow-user.model';

describe('Component Tests', () => {
  describe('FollowUser Management Update Component', () => {
    let comp: FollowUserUpdateComponent;
    let fixture: ComponentFixture<FollowUserUpdateComponent>;
    let service: FollowUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule],
        declarations: [FollowUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FollowUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FollowUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FollowUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FollowUser(123);
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
        const entity = new FollowUser();
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
