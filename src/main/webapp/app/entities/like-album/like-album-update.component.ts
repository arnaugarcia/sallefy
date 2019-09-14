import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ILikeAlbum, LikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';
import { IUser, UserService } from 'app/core';
import { IAlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from 'app/entities/album-sf';

@Component({
  selector: 'jhi-like-album-update',
  templateUrl: './like-album-update.component.html'
})
export class LikeAlbumUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  albums: IAlbumSf[];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    userId: [],
    albumId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected likeAlbumService: LikeAlbumService,
    protected userService: UserService,
    protected albumService: AlbumSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ likeAlbum }) => {
      this.updateForm(likeAlbum);
    });
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.albumService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlbumSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlbumSf[]>) => response.body)
      )
      .subscribe((res: IAlbumSf[]) => (this.albums = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(likeAlbum: ILikeAlbum) {
    this.editForm.patchValue({
      id: likeAlbum.id,
      liked: likeAlbum.liked,
      date: likeAlbum.date != null ? likeAlbum.date.format(DATE_TIME_FORMAT) : null,
      userId: likeAlbum.userId,
      albumId: likeAlbum.albumId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const likeAlbum = this.createFromForm();
    if (likeAlbum.id !== undefined) {
      this.subscribeToSaveResponse(this.likeAlbumService.update(likeAlbum));
    } else {
      this.subscribeToSaveResponse(this.likeAlbumService.create(likeAlbum));
    }
  }

  private createFromForm(): ILikeAlbum {
    return {
      ...new LikeAlbum(),
      id: this.editForm.get(['id']).value,
      liked: this.editForm.get(['liked']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId']).value,
      albumId: this.editForm.get(['albumId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeAlbum>>) {
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

  trackAlbumById(index: number, item: IAlbumSf) {
    return item.id;
  }
}
