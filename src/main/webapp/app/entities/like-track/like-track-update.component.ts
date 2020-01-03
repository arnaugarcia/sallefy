import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ILikeTrack, LikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

type SelectableEntity = IUser | ITrack;

@Component({
  selector: 'jhi-like-track-update',
  templateUrl: './like-track-update.component.html'
})
export class LikeTrackUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  tracks: ITrack[] = [];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    userId: [null, Validators.required],
    trackId: [null, Validators.required]
  });

  constructor(
    protected likeTrackService: LikeTrackService,
    protected userService: UserService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ likeTrack }) => {
      this.updateForm(likeTrack);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));

      this.trackService
        .query()
        .pipe(
          map((res: HttpResponse<ITrack[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ITrack[]) => (this.tracks = resBody));
    });
  }

  updateForm(likeTrack: ILikeTrack): void {
    this.editForm.patchValue({
      id: likeTrack.id,
      liked: likeTrack.liked,
      date: likeTrack.date != null ? likeTrack.date.format(DATE_TIME_FORMAT) : null,
      userId: likeTrack.userId,
      trackId: likeTrack.trackId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      liked: this.editForm.get(['liked'])!.value,
      date: this.editForm.get(['date'])!.value != null ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value,
      trackId: this.editForm.get(['trackId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeTrack>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
