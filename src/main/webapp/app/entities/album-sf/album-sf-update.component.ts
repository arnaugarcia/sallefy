import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAlbumSf, AlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from './album-sf.service';

@Component({
  selector: 'jhi-album-sf-update',
  templateUrl: './album-sf-update.component.html'
})
export class AlbumSfUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [],
    reference: [],
    totalTracks: []
  });

  constructor(protected albumService: AlbumSfService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ album }) => {
      this.updateForm(album);
    });
  }

  updateForm(album: IAlbumSf) {
    this.editForm.patchValue({
      id: album.id,
      title: album.title,
      reference: album.reference,
      totalTracks: album.totalTracks
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
      totalTracks: this.editForm.get(['totalTracks']).value
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
}
