import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { PlaylistService } from './playlist.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

@Component({
  selector: 'jhi-playlist-update',
  templateUrl: './playlist-update.component.html'
})
export class PlaylistUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  tracks: ITrack[];

  editForm = this.fb.group({
    id: [],
    name: [],
    collaborative: [],
    description: [],
    primaryColor: [],
    cover: [],
    thumbnail: [],
    publicAccessible: [],
    numberSongs: [],
    followers: [],
    rating: [],
    userId: [],
    tracks: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected playlistService: PlaylistService,
    protected userService: UserService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.updateForm(playlist);
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

  updateForm(playlist: IPlaylist) {
    this.editForm.patchValue({
      id: playlist.id,
      name: playlist.name,
      collaborative: playlist.collaborative,
      description: playlist.description,
      primaryColor: playlist.primaryColor,
      cover: playlist.cover,
      thumbnail: playlist.thumbnail,
      publicAccessible: playlist.publicAccessible,
      numberSongs: playlist.numberSongs,
      followers: playlist.followers,
      rating: playlist.rating,
      userId: playlist.userId,
      tracks: playlist.tracks
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const playlist = this.createFromForm();
    if (playlist.id !== undefined) {
      this.subscribeToSaveResponse(this.playlistService.update(playlist));
    } else {
      this.subscribeToSaveResponse(this.playlistService.create(playlist));
    }
  }

  private createFromForm(): IPlaylist {
    return {
      ...new Playlist(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      collaborative: this.editForm.get(['collaborative']).value,
      description: this.editForm.get(['description']).value,
      primaryColor: this.editForm.get(['primaryColor']).value,
      cover: this.editForm.get(['cover']).value,
      thumbnail: this.editForm.get(['thumbnail']).value,
      publicAccessible: this.editForm.get(['publicAccessible']).value,
      numberSongs: this.editForm.get(['numberSongs']).value,
      followers: this.editForm.get(['followers']).value,
      rating: this.editForm.get(['rating']).value,
      userId: this.editForm.get(['userId']).value,
      tracks: this.editForm.get(['tracks']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaylist>>) {
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
