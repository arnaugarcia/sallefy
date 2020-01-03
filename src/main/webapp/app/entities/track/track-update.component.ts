import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITrack, Track } from 'app/shared/model/track.model';
import { TrackService } from './track.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from 'app/entities/genre/genre.service';

type SelectableEntity = IUser | IGenre;

@Component({
  selector: 'jhi-track-update',
  templateUrl: './track-update.component.html'
})
export class TrackUpdateComponent implements OnInit {
  isSaving = false;

  users: IUser[] = [];

  genres: IGenre[] = [];

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
    userId: [null, Validators.required],
    genres: []
  });

  constructor(
    protected trackService: TrackService,
    protected userService: UserService,
    protected genreService: GenreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ track }) => {
      this.updateForm(track);

      this.userService
        .query()
        .pipe(
          map((res: HttpResponse<IUser[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IUser[]) => (this.users = resBody));

      this.genreService
        .query()
        .pipe(
          map((res: HttpResponse<IGenre[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IGenre[]) => (this.genres = resBody));
    });
  }

  updateForm(track: ITrack): void {
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      rating: this.editForm.get(['rating'])!.value,
      url: this.editForm.get(['url'])!.value,
      popularity: this.editForm.get(['popularity'])!.value,
      thumbnail: this.editForm.get(['thumbnail'])!.value,
      createdAt:
        this.editForm.get(['createdAt'])!.value != null ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      released:
        this.editForm.get(['released'])!.value != null ? moment(this.editForm.get(['released'])!.value, DATE_TIME_FORMAT) : undefined,
      duration: this.editForm.get(['duration'])!.value,
      color: this.editForm.get(['color'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      genres: this.editForm.get(['genres'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrack>>): void {
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

  getSelected(selectedVals: IGenre[], option: IGenre): IGenre {
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
