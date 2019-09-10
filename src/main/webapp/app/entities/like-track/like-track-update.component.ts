import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ILikeTrack, LikeTrack } from 'app/shared/model/like-track.model';
import { LikeTrackService } from './like-track.service';
import { ITrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from 'app/entities/track-sf';

@Component({
  selector: 'jhi-like-track-update',
  templateUrl: './like-track-update.component.html'
})
export class LikeTrackUpdateComponent implements OnInit {
  isSaving: boolean;

  tracks: ITrackSf[];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    trackId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected likeTrackService: LikeTrackService,
    protected trackService: TrackSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ likeTrack }) => {
      this.updateForm(likeTrack);
    });
    this.trackService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITrackSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrackSf[]>) => response.body)
      )
      .subscribe((res: ITrackSf[]) => (this.tracks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(likeTrack: ILikeTrack) {
    this.editForm.patchValue({
      id: likeTrack.id,
      liked: likeTrack.liked,
      date: likeTrack.date != null ? likeTrack.date.format(DATE_TIME_FORMAT) : null,
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

  trackTrackById(index: number, item: ITrackSf) {
    return item.id;
  }
}
