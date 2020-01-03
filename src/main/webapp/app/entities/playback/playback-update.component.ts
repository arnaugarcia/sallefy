import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPlayback, Playback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

type SelectableEntity = IUser | ITrack;

@Component({
  selector: 'jhi-playback-update',
  templateUrl: './playback-update.component.html'
})
export class PlaybackUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  tracks: ITrack[] = [];

  editForm = this.fb.group({
    id: [],
    ip: [],
    latitude: [],
    longitude: [],
    agent: [],
    date: [],
    userId: [null, Validators.required],
    trackId: [null, Validators.required]
  });

  constructor(
    protected playbackService: PlaybackService,
    protected userService: UserService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playback }) => {
      this.updateForm(playback);

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

  updateForm(playback: IPlayback): void {
    this.editForm.patchValue({
      id: playback.id,
      ip: playback.ip,
      latitude: playback.latitude,
      longitude: playback.longitude,
      agent: playback.agent,
      date: playback.date != null ? playback.date.format(DATE_TIME_FORMAT) : null,
      userId: playback.userId,
      trackId: playback.trackId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const playback = this.createFromForm();
    if (playback.id !== undefined) {
      this.subscribeToSaveResponse(this.playbackService.update(playback));
    } else {
      this.subscribeToSaveResponse(this.playbackService.create(playback));
    }
  }

  private createFromForm(): IPlayback {
    return {
      ...new Playback(),
      id: this.editForm.get(['id'])!.value,
      ip: this.editForm.get(['ip'])!.value,
      latitude: this.editForm.get(['latitude'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
      agent: this.editForm.get(['agent'])!.value,
      date: this.editForm.get(['date'])!.value != null ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value,
      trackId: this.editForm.get(['trackId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayback>>): void {
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
