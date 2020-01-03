import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ILikeAlbum, LikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

type SelectableEntity = IUser | IAlbum;

@Component({
  selector: 'jhi-like-album-update',
  templateUrl: './like-album-update.component.html'
})
export class LikeAlbumUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    liked: [],
    date: [],
    userId: [null, Validators.required],
    albumId: [null, Validators.required]
  });

  constructor(
    protected likeAlbumService: LikeAlbumService,
    protected userService: UserService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ likeAlbum }) => {
      this.updateForm(likeAlbum);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));

      this.albumService
        .query()
        .pipe(
          map((res: HttpResponse<IAlbum[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IAlbum[]) => (this.albums = resBody));
    });
  }

  updateForm(likeAlbum: ILikeAlbum): void {
    this.editForm.patchValue({
      id: likeAlbum.id,
      liked: likeAlbum.liked,
      date: likeAlbum.date != null ? likeAlbum.date.format(DATE_TIME_FORMAT) : null,
      userId: likeAlbum.userId,
      albumId: likeAlbum.albumId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      liked: this.editForm.get(['liked'])!.value,
      date: this.editForm.get(['date'])!.value != null ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value,
      albumId: this.editForm.get(['albumId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeAlbum>>): void {
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
}
