import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { IArtistSf, ArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from './artist-sf.service';
import { IAlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from 'app/entities/album-sf';

@Component({
  selector: 'jhi-artist-sf-update',
  templateUrl: './artist-sf-update.component.html'
})
export class ArtistSfUpdateComponent implements OnInit {
  isSaving: boolean;

  albums: IAlbumSf[];

  editForm = this.fb.group({
    id: [],
    name: [],
    reference: [],
    photo: [],
    biography: [],
    albumId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected artistService: ArtistSfService,
    protected albumService: AlbumSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ artist }) => {
      this.updateForm(artist);
    });
    this.albumService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlbumSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlbumSf[]>) => response.body)
      )
      .subscribe((res: IAlbumSf[]) => (this.albums = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(artist: IArtistSf) {
    this.editForm.patchValue({
      id: artist.id,
      name: artist.name,
      reference: artist.reference,
      photo: artist.photo,
      biography: artist.biography,
      albumId: artist.albumId
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
      biography: this.editForm.get(['biography']).value,
      albumId: this.editForm.get(['albumId']).value
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

  trackAlbumById(index: number, item: IAlbumSf) {
    return item.id;
  }
}
