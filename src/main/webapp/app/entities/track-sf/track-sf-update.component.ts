import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITrackSf, TrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from './track-sf.service';
import { IUser, UserService } from 'app/core';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { PlaylistSfService } from 'app/entities/playlist-sf';
import { IAlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from 'app/entities/album-sf';

@Component({
  selector: 'jhi-track-sf-update',
  templateUrl: './track-sf-update.component.html'
})
export class TrackSfUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  playlists: IPlaylistSf[];

  albums: IAlbumSf[];

  editForm = this.fb.group({
    id: [],
    name: [],
    rating: [],
    url: [],
    thumbnail: [],
    createdAt: [],
    duration: [],
    primaryColor: [],
    userId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected trackService: TrackSfService,
    protected userService: UserService,
    protected playlistService: PlaylistSfService,
    protected albumService: AlbumSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ track }) => {
      this.updateForm(track);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylistSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylistSf[]>) => response.body)
      )
      .subscribe((res: IPlaylistSf[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.albumService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlbumSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlbumSf[]>) => response.body)
      )
      .subscribe((res: IAlbumSf[]) => (this.albums = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(track: ITrackSf) {
    this.editForm.patchValue({
      id: track.id,
      name: track.name,
      rating: track.rating,
      url: track.url,
      thumbnail: track.thumbnail,
      createdAt: track.createdAt != null ? track.createdAt.format(DATE_TIME_FORMAT) : null,
      duration: track.duration,
      primaryColor: track.primaryColor,
      userId: track.userId
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
      rating: this.editForm.get(['rating']).value,
      url: this.editForm.get(['url']).value,
      thumbnail: this.editForm.get(['thumbnail']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      duration: this.editForm.get(['duration']).value,
      primaryColor: this.editForm.get(['primaryColor']).value,
      userId: this.editForm.get(['userId']).value
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

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackPlaylistById(index: number, item: IPlaylistSf) {
    return item.id;
  }

  trackAlbumById(index: number, item: IAlbumSf) {
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
