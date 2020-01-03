import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFollowUser, FollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-follow-user-update',
  templateUrl: './follow-user-update.component.html'
})
export class FollowUserUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    followedId: [null, Validators.required],
    userId: [null, Validators.required]
  });

  constructor(
    protected followUserService: FollowUserService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ followUser }) => {
      this.updateForm(followUser);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));
    });
  }

  updateForm(followUser: IFollowUser): void {
    this.editForm.patchValue({
      id: followUser.id,
      date: followUser.date != null ? followUser.date.format(DATE_TIME_FORMAT) : null,
      followedId: followUser.followedId,
      userId: followUser.userId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const followUser = this.createFromForm();
    if (followUser.id !== undefined) {
      this.subscribeToSaveResponse(this.followUserService.update(followUser));
    } else {
      this.subscribeToSaveResponse(this.followUserService.create(followUser));
    }
  }

  private createFromForm(): IFollowUser {
    return {
      ...new FollowUser(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value != null ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      followedId: this.editForm.get(['followedId'])!.value,
      userId: this.editForm.get(['userId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollowUser>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
