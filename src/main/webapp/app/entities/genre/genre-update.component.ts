import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGenre, Genre } from 'app/shared/model/genre.model';
import { GenreService } from './genre.service';

@Component({
  selector: 'jhi-genre-update',
  templateUrl: './genre-update.component.html'
})
export class GenreUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    popularity: []
  });

  constructor(protected genreService: GenreService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genre }) => {
      this.updateForm(genre);
    });
  }

  updateForm(genre: IGenre): void {
    this.editForm.patchValue({
      id: genre.id,
      name: genre.name,
      popularity: genre.popularity
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
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
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      popularity: this.editForm.get(['popularity'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenre>>): void {
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
}
