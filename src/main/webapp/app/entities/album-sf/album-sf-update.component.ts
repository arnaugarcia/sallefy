import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAlbumSf, AlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from './album-sf.service';
import { IArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from 'app/entities/artist-sf';

@Component({
  selector: 'jhi-album-sf-update',
  templateUrl: './album-sf-update.component.html'
})
export class AlbumSfUpdateComponent implements OnInit {
  isSaving: boolean;

  artists: IArtistSf[];

  editForm = this.fb.group({
    id: [],
    title: [],
    reference: [],
    year: [],
    totalTracks: [],
    artists: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected albumService: AlbumSfService,
    protected artistService: ArtistSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ album }) => {
      this.updateForm(album);
    });
    this.artistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArtistSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArtistSf[]>) => response.body)
      )
      .subscribe((res: IArtistSf[]) => (this.artists = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(album: IAlbumSf) {
    this.editForm.patchValue({
      id: album.id,
      title: album.title,
      reference: album.reference,
      year: album.year,
      totalTracks: album.totalTracks,
      artists: album.artists
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbumSf {
    return {
      ...new AlbumSf(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      reference: this.editForm.get(['reference']).value,
      year: this.editForm.get(['year']).value,
      totalTracks: this.editForm.get(['totalTracks']).value,
      artists: this.editForm.get(['artists']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbumSf>>) {
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
