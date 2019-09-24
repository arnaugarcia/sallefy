import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ILikeTrack, LikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

@Component({
  selector: 'jhi-like-track-update',
  templateUrl: './like-track-update.component.html'
})
export class LikeTrackUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  tracks: ITrack[];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    userId: [null, Validators.required],
    trackId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected likeTrackService: LikeTrackService,
    protected userService: UserService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ likeTrack }) => {
      this.updateForm(likeTrack);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.trackService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITrack[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrack[]>) => response.body)
      )
      .subscribe((res: ITrack[]) => (this.tracks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(likeTrack: ILikeTrack) {
    this.editForm.patchValue({
      id: likeTrack.id,
      liked: likeTrack.liked,
      date: likeTrack.date != null ? likeTrack.date.format(DATE_TIME_FORMAT) : null,
      userId: likeTrack.userId,
      trackId: likeTrack.trackId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const likeTrack = this.createFromForm();
    if (likeTrack.id !== undefined) {
      this.subscribeToSaveResponse(this.likeTrackService.update(likeTrack));
    } else {
      this.subscribeToSaveResponse(this.likeTrackService.create(likeTrack));
    }
  }

  private createFromForm(): ILikeTrack {
    return {
      ...new LikeTrack(),
      id: this.editForm.get(['id']).value,
      liked: this.editForm.get(['liked']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId']).value,
      trackId: this.editForm.get(['trackId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeTrack>>) {
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

  trackTrackById(index: number, item: ITrack) {
    return item.id;
  }
}
