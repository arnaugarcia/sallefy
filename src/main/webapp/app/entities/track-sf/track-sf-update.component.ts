import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITrackSf, TrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from './track-sf.service';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { PlaylistSfService } from 'app/entities/playlist-sf';

@Component({
  selector: 'jhi-track-sf-update',
  templateUrl: './track-sf-update.component.html'
})
export class TrackSfUpdateComponent implements OnInit {
  isSaving: boolean;

  playlists: IPlaylistSf[];

  editForm = this.fb.group({
    id: [],
    name: [],
    raiting: [],
    url: [],
    reference: [],
    duration: [],
    primaryColor: [],
    playlists: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected trackService: TrackSfService,
    protected playlistService: PlaylistSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ track }) => {
      this.updateForm(track);
    });
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylistSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylistSf[]>) => response.body)
      )
      .subscribe((res: IPlaylistSf[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(track: ITrackSf) {
    this.editForm.patchValue({
      id: track.id,
      name: track.name,
      raiting: track.raiting,
      url: track.url,
      reference: track.reference,
      duration: track.duration,
      primaryColor: track.primaryColor,
      playlists: track.playlists
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const track = this.createFromForm();
    if (track.id !== undefined) {
      this.subscribeToSaveResponse(this.trackService.update(track));
    } else {
      this.subscribeToSaveResponse(this.trackService.create(track));
    }
  }

  private createFromForm(): ITrackSf {
    return {
      ...new TrackSf(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      raiting: this.editForm.get(['raiting']).value,
      url: this.editForm.get(['url']).value,
      reference: this.editForm.get(['reference']).value,
      duration: this.editForm.get(['duration']).value,
      primaryColor: this.editForm.get(['primaryColor']).value,
      playlists: this.editForm.get(['playlists']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrackSf>>) {
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

  trackPlaylistById(index: number, item: IPlaylistSf) {
    return item.id;
  }

  getSelected(selectedVals: Array<any>, option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
