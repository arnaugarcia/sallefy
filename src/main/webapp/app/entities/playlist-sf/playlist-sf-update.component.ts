import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IPlaylistSf, PlaylistSf } from 'app/shared/model/playlist-sf.model';
import { PlaylistSfService } from './playlist-sf.service';
import { IUser, UserService } from 'app/core';
import { ITrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from 'app/entities/track-sf';

@Component({
  selector: 'jhi-playlist-sf-update',
  templateUrl: './playlist-sf-update.component.html'
})
export class PlaylistSfUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  tracks: ITrackSf[];

  editForm = this.fb.group({
    id: [],
    name: [],
    collaborative: [],
    reference: [],
    description: [],
    primaryColor: [],
    publicAccessible: [],
    numberSongs: [],
    followers: [],
    rating: [],
    ownerId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected playlistService: PlaylistSfService,
    protected userService: UserService,
    protected trackService: TrackSfService,
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
        filter((mayBeOk: HttpResponse<ITrackSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrackSf[]>) => response.body)
      )
      .subscribe((res: ITrackSf[]) => (this.tracks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(playlist: IPlaylistSf) {
    this.editForm.patchValue({
      id: playlist.id,
      name: playlist.name,
      collaborative: playlist.collaborative,
      reference: playlist.reference,
      description: playlist.description,
      primaryColor: playlist.primaryColor,
      publicAccessible: playlist.publicAccessible,
      numberSongs: playlist.numberSongs,
      followers: playlist.followers,
      rating: playlist.rating,
      ownerId: playlist.ownerId
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
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
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
      () => console.log('blob added'), // sucess
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

  private createFromForm(): IPlaylistSf {
    return {
      ...new PlaylistSf(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      collaborative: this.editForm.get(['collaborative']).value,
      reference: this.editForm.get(['reference']).value,
      description: this.editForm.get(['description']).value,
      primaryColor: this.editForm.get(['primaryColor']).value,
      publicAccessible: this.editForm.get(['publicAccessible']).value,
      numberSongs: this.editForm.get(['numberSongs']).value,
      followers: this.editForm.get(['followers']).value,
      rating: this.editForm.get(['rating']).value,
      ownerId: this.editForm.get(['ownerId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaylistSf>>) {
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

  trackTrackById(index: number, item: ITrackSf) {
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
