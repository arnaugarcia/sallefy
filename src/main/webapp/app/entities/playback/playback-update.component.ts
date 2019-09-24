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
import { IPlayback, Playback } from 'app/shared/model/playback.model';
import { PlaybackService } from './playback.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

@Component({
  selector: 'jhi-playback-update',
  templateUrl: './playback-update.component.html'
})
export class PlaybackUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  tracks: ITrack[];

  editForm = this.fb.group({
    id: [],
    ip: [],
    latitude: [],
    longitude: [],
    date: [],
    userId: [null, Validators.required],
    trackId: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected playbackService: PlaybackService,
    protected userService: UserService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ playback }) => {
      this.updateForm(playback);
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

  updateForm(playback: IPlayback) {
    this.editForm.patchValue({
      id: playback.id,
      ip: playback.ip,
      latitude: playback.latitude,
      longitude: playback.longitude,
      date: playback.date != null ? playback.date.format(DATE_TIME_FORMAT) : null,
      userId: playback.userId,
      trackId: playback.trackId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      ip: this.editForm.get(['ip']).value,
      latitude: this.editForm.get(['latitude']).value,
      longitude: this.editForm.get(['longitude']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId']).value,
      trackId: this.editForm.get(['trackId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayback>>) {
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
