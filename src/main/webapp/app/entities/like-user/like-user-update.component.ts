import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ILikeUser, LikeUser } from 'app/shared/model/like-user.model';
import { LikeUserService } from './like-user.service';
import { IUser, UserService } from 'app/core';

@Component({
  selector: 'jhi-like-user-update',
  templateUrl: './like-user-update.component.html'
})
export class LikeUserUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    likedUserId: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected likeUserService: LikeUserService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ likeUser }) => {
      this.updateForm(likeUser);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(likeUser: ILikeUser) {
    this.editForm.patchValue({
      id: likeUser.id,
      liked: likeUser.liked,
      date: likeUser.date != null ? likeUser.date.format(DATE_TIME_FORMAT) : null,
      likedUserId: likeUser.likedUserId,
      userId: likeUser.userId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const likeUser = this.createFromForm();
    if (likeUser.id !== undefined) {
      this.subscribeToSaveResponse(this.likeUserService.update(likeUser));
    } else {
      this.subscribeToSaveResponse(this.likeUserService.create(likeUser));
    }
  }

  private createFromForm(): ILikeUser {
    return {
      ...new LikeUser(),
      id: this.editForm.get(['id']).value,
      liked: this.editForm.get(['liked']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      likedUserId: this.editForm.get(['likedUserId']).value,
      userId: this.editForm.get(['userId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeUser>>) {
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
