import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAlbum, Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html'
})
export class AlbumUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  tracks: ITrack[];

  editForm = this.fb.group({
    id: [],
    title: [],
    year: [],
    thumbnail: [],
    totalTracks: [],
    userId: [],
    tracks: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected albumService: AlbumService,
    protected userService: UserService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ album }) => {
      this.updateForm(album);
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

  updateForm(album: IAlbum) {
    this.editForm.patchValue({
      id: album.id,
      title: album.title,
      year: album.year,
      thumbnail: album.thumbnail,
      totalTracks: album.totalTracks,
      userId: album.userId,
      tracks: album.tracks
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbum {
    return {
      ...new Album(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      year: this.editForm.get(['year']).value,
      thumbnail: this.editForm.get(['thumbnail']).value,
      totalTracks: this.editForm.get(['totalTracks']).value,
      userId: this.editForm.get(['userId']).value,
      tracks: this.editForm.get(['tracks']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>) {
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
