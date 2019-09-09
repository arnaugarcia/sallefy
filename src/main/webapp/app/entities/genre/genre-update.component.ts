import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGenre, Genre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';
import { IArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from 'app/entities/artist-sf';

@Component({
  selector: 'jhi-genre-update',
  templateUrl: './genre-update.component.html'
})
export class GenreUpdateComponent implements OnInit {
  isSaving: boolean;

  artists: IArtistSf[];

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected genreService: GenreService,
    protected artistService: ArtistSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ genre }) => {
      this.updateForm(genre);
    });
    this.artistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArtistSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArtistSf[]>) => response.body)
      )
      .subscribe((res: IArtistSf[]) => (this.artists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(genre: IGenre) {
    this.editForm.patchValue({
      id: genre.id,
      name: genre.name
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
      name: this.editForm.get(['name']).value
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

  trackArtistById(index: number, item: IArtistSf) {
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
