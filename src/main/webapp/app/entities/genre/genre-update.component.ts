import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGenre, Genre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/entities/track/track.service';

@Component({
  selector: 'jhi-genre-update',
  templateUrl: './genre-update.component.html'
})
export class GenreUpdateComponent implements OnInit {
  isSaving: boolean;

  tracks: ITrack[];

  editForm = this.fb.group({
    id: [],
    name: [],
    popularity: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected genreService: GenreService,
    protected trackService: TrackService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ genre }) => {
      this.updateForm(genre);
    });
    this.trackService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITrack[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrack[]>) => response.body)
      )
      .subscribe((res: ITrack[]) => (this.tracks = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(genre: IGenre) {
    this.editForm.patchValue({
      id: genre.id,
      name: genre.name,
      popularity: genre.popularity
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const genre = this.createFromForm();
    if (genre.id !== undefined) {
      this.subscribeToSaveResponse(this.genreService.update(genre));
    } else {
      this.subscribeToSaveResponse(this.genreService.create(genre));
    }
  }

  private createFromForm(): IGenre {
    return {
      ...new Genre(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      popularity: this.editForm.get(['popularity']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenre>>) {
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
