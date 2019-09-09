import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IArtistSf, ArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from './artist-sf.service';
import { IGenre } from 'app/shared/model/genre.model';
import { GenreService } from 'app/entities/genre';

@Component({
  selector: 'jhi-artist-sf-update',
  templateUrl: './artist-sf-update.component.html'
})
export class ArtistSfUpdateComponent implements OnInit {
  isSaving: boolean;

  genres: IGenre[];

  editForm = this.fb.group({
    id: [],
    name: [],
    reference: [],
    photo: [],
    followers: [],
    biography: [],
    genres: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected artistService: ArtistSfService,
    protected genreService: GenreService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ artist }) => {
      this.updateForm(artist);
    });
    this.genreService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IGenre[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGenre[]>) => response.body)
      )
      .subscribe((res: IGenre[]) => (this.genres = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(artist: IArtistSf) {
    this.editForm.patchValue({
      id: artist.id,
      name: artist.name,
      reference: artist.reference,
      photo: artist.photo,
      followers: artist.followers,
      biography: artist.biography,
      genres: artist.genres
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const artist = this.createFromForm();
    if (artist.id !== undefined) {
      this.subscribeToSaveResponse(this.artistService.update(artist));
    } else {
      this.subscribeToSaveResponse(this.artistService.create(artist));
    }
  }

  private createFromForm(): IArtistSf {
    return {
      ...new ArtistSf(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      reference: this.editForm.get(['reference']).value,
      photo: this.editForm.get(['photo']).value,
      followers: this.editForm.get(['followers']).value,
      biography: this.editForm.get(['biography']).value,
      genres: this.editForm.get(['genres']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArtistSf>>) {
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

  trackGenreById(index: number, item: IGenre) {
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
