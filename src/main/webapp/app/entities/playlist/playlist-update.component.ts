import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiDataUtils, JhiEventManager, JhiEventWithContent, JhiFileLoadError } from 'ng-jhipster';

import { IPlaylist, Playlist } from 'app/shared/model/playlist.model';
import { PlaylistService } from '../../shared/services/playlist.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';

type SelectableEntity = IUser | ITrack;

@Component({
  selector: 'sf-playlist-update',
  templateUrl: './playlist-update.component.html'
})
export class PlaylistUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  tracks: ITrack[] = [];

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
    userId: [null, Validators.required],
    tracks: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected playlistService: PlaylistService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ playlist }) => {
      this.updateForm(playlist);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));
    });
  }

  updateForm(playlist: IPlaylist): void {
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

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('sallefyApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      collaborative: this.editForm.get(['collaborative'])!.value,
      description: this.editForm.get(['description'])!.value,
      primaryColor: this.editForm.get(['primaryColor'])!.value,
      cover: this.editForm.get(['cover'])!.value,
      thumbnail: this.editForm.get(['thumbnail'])!.value,
      publicAccessible: this.editForm.get(['publicAccessible'])!.value,
      numberSongs: this.editForm.get(['numberSongs'])!.value,
      followers: this.editForm.get(['followers'])!.value,
      rating: this.editForm.get(['rating'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      tracks: this.editForm.get(['tracks'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlaylist>>): void {
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

  getSelected(selectedVals: ITrack[], option: ITrack): ITrack {
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
