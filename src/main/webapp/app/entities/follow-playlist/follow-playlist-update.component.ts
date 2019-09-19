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
import { IFollowPlaylist, FollowPlaylist } from 'app/shared/model/follow-playlist.model';
import { FollowPlaylistService } from './follow-playlist.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { PlaylistService } from 'app/entities/playlist/playlist.service';

@Component({
  selector: 'jhi-follow-playlist-update',
  templateUrl: './follow-playlist-update.component.html'
})
export class FollowPlaylistUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  playlists: IPlaylist[];

  editForm = this.fb.group({
    id: [],
    date: [],
    userId: [],
    playlistId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected followPlaylistService: FollowPlaylistService,
    protected userService: UserService,
    protected playlistService: PlaylistService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ followPlaylist }) => {
      this.updateForm(followPlaylist);
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
        filter((mayBeOk: HttpResponse<IPlaylist[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylist[]>) => response.body)
      )
      .subscribe((res: IPlaylist[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(followPlaylist: IFollowPlaylist) {
    this.editForm.patchValue({
      id: followPlaylist.id,
      date: followPlaylist.date != null ? followPlaylist.date.format(DATE_TIME_FORMAT) : null,
      userId: followPlaylist.userId,
      playlistId: followPlaylist.playlistId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
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
      id: this.editForm.get(['id']).value,
      date: this.editForm.get(['date']).value != null ? moment(this.editForm.get(['date']).value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId']).value,
      playlistId: this.editForm.get(['playlistId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFollowPlaylist>>) {
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

  trackPlaylistById(index: number, item: IPlaylist) {
    return item.id;
  }
}
