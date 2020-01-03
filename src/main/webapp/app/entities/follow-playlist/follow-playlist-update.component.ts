import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFollowPlaylist, FollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist/playlist.service';

type SelectableEntity = IUser | IPlaylist;

@Component({
  selector: 'jhi-follow-playlist-update',
  templateUrl: './follow-playlist-update.component.html'
})
export class FollowPlaylistUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  playlists: IPlaylist[] = [];

  editForm = this.fb.group({
    id: [],
    date: [],
    userId: [null, Validators.required],
    playlistId: [null, Validators.required]
  });

  constructor(
    protected followPlaylistService: FollowPlaylistService,
    protected userService: UserService,
    protected playlistService: PlaylistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ followPlaylist }) => {
      this.updateForm(followPlaylist);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));

      this.playlistService
        .query()
        .pipe(
          map((res: HttpResponse<IPlaylist[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IPlaylist[]) => (this.playlists = resBody));
    });
  }

  updateForm(followPlaylist: IFollowPlaylist): void {
    this.editForm.patchValue({
      id: followPlaylist.id,
      date: followPlaylist.date != null ? followPlaylist.date.format(DATE_TIME_FORMAT) : null,
      userId: followPlaylist.userId,
      playlistId: followPlaylist.playlistId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const followPlaylist = this.createFromForm();
    if (followPlaylist.id !== undefined) {
      this.subscribeToSaveResponse(this.followPlaylistService.update(followPlaylist));
    } else {
      this.subscribeToSaveResponse(this.followPlaylistService.create(followPlaylist));
    }
  }

  private createFromForm(): IFollowPlaylist {
    return {
      ...new FollowPlaylist(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value != null ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value,
      playlistId: this.editForm.get(['playlistId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollowPlaylist>>): void {
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
