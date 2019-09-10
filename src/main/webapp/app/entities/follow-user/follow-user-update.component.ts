import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFollowUser, FollowUser } from 'app/shared/model/follow-user.model';
import { FollowUserService } from './follow-user.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-follow-user-update',
  templateUrl: './follow-user-update.component.html'
})
export class FollowUserUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    followedId: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected followUserService: FollowUserService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ followUser }) => {
      this.updateForm(followUser);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(followUser: IFollowUser) {
    this.editForm.patchValue({
      id: followUser.id,
      liked: followUser.liked,
      date: followUser.date != null ? followUser.date.format(DATE_TIME_FORMAT) : null,
      followedId: followUser.followedId,
      userId: followUser.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      liked: this.editForm.get(['liked']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      followedId: this.editForm.get(['followedId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollowUser>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
