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
import { ITrack, Track } from 'app/shared/model/track.model';
import { TrackService } from './track.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from 'app/entities/genre/genre.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

@Component({
  selector: 'jhi-track-update',
  templateUrl: './track-update.component.html'
})
export class TrackUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  genres: IGenre[];

  playlists: IPlaylist[];

  albums: IAlbum[];

  editForm = this.fb.group({
    id: [],
    name: [],
    rating: [],
    url: [],
    popularity: [],
    thumbnail: [],
    createdAt: [],
    released: [],
    duration: [],
    color: [],
    userId: [],
    genres: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected trackService: TrackService,
    protected userService: UserService,
    protected genreService: GenreService,
    protected playlistService: PlaylistService,
    protected albumService: AlbumService,
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
    this.genreService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGenre[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGenre[]>) => response.body)
      )
      .subscribe((res: IGenre[]) => (this.genres = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.albumService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlbum[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlbum[]>) => response.body)
      )
      .subscribe((res: IAlbum[]) => (this.albums = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(track: ITrack) {
    this.editForm.patchValue({
      id: track.id,
      name: track.name,
      rating: track.rating,
      url: track.url,
      popularity: track.popularity,
      thumbnail: track.thumbnail,
      createdAt: track.createdAt != null ? track.createdAt.format(DATE_TIME_FORMAT) : null,
      released: track.released != null ? track.released.format(DATE_TIME_FORMAT) : null,
      duration: track.duration,
      color: track.color,
      userId: track.userId,
      genres: track.genres
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

  private createFromForm(): ITrack {
    return {
      ...new Track(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      rating: this.editForm.get(['rating']).value,
      url: this.editForm.get(['url']).value,
      popularity: this.editForm.get(['popularity']).value,
      thumbnail: this.editForm.get(['thumbnail']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      released: this.editForm.get(['released']).value != null ? moment(this.editForm.get(['released']).value, DATE_TIME_FORMAT) : undefined,
      duration: this.editForm.get(['duration']).value,
      color: this.editForm.get(['color']).value,
      userId: this.editForm.get(['userId']).value,
      genres: this.editForm.get(['genres']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrack>>) {
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

  trackGenreById(index: number, item: IGenre) {
    return item.id;
  }

  trackPlaylistById(index: number, item: IPlaylist) {
    return item.id;
  }

  trackAlbumById(index: number, item: IAlbum) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
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
