import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IImageSf, ImageSf } from 'app/shared/model/image-sf.model';
import { ImageSfService } from './image-sf.service';
import { ITrackSf } from 'app/shared/model/track-sf.model';
import { TrackSfService } from 'app/entities/track-sf';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { PlaylistSfService } from 'app/entities/playlist-sf';
import { IArtistSf } from 'app/shared/model/artist-sf.model';
import { ArtistSfService } from 'app/entities/artist-sf';
import { IAlbumSf } from 'app/shared/model/album-sf.model';
import { AlbumSfService } from 'app/entities/album-sf';

@Component({
  selector: 'jhi-image-sf-update',
  templateUrl: './image-sf-update.component.html'
})
export class ImageSfUpdateComponent implements OnInit {
  isSaving: boolean;

  tracks: ITrackSf[];

  playlists: IPlaylistSf[];

  artists: IArtistSf[];

  albums: IAlbumSf[];

  editForm = this.fb.group({
    id: [],
    url: [],
    height: [],
    thumbnail: [],
    cover: [],
    width: [],
    trackId: [],
    playlistId: [],
    artistId: [],
    albumId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected imageService: ImageSfService,
    protected trackService: TrackSfService,
    protected playlistService: PlaylistSfService,
    protected artistService: ArtistSfService,
    protected albumService: AlbumSfService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ image }) => {
      this.updateForm(image);
    });
    this.trackService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITrackSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITrackSf[]>) => response.body)
      )
      .subscribe((res: ITrackSf[]) => (this.tracks = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.playlistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlaylistSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlaylistSf[]>) => response.body)
      )
      .subscribe((res: IPlaylistSf[]) => (this.playlists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.artistService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArtistSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArtistSf[]>) => response.body)
      )
      .subscribe((res: IArtistSf[]) => (this.artists = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.albumService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAlbumSf[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAlbumSf[]>) => response.body)
      )
      .subscribe((res: IAlbumSf[]) => (this.albums = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(image: IImageSf) {
    this.editForm.patchValue({
      id: image.id,
      url: image.url,
      height: image.height,
      thumbnail: image.thumbnail,
      cover: image.cover,
      width: image.width,
      trackId: image.trackId,
      playlistId: image.playlistId,
      artistId: image.artistId,
      albumId: image.albumId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const image = this.createFromForm();
    if (image.id !== undefined) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  private createFromForm(): IImageSf {
    return {
      ...new ImageSf(),
      id: this.editForm.get(['id']).value,
      url: this.editForm.get(['url']).value,
      height: this.editForm.get(['height']).value,
      thumbnail: this.editForm.get(['thumbnail']).value,
      cover: this.editForm.get(['cover']).value,
      width: this.editForm.get(['width']).value,
      trackId: this.editForm.get(['trackId']).value,
      playlistId: this.editForm.get(['playlistId']).value,
      artistId: this.editForm.get(['artistId']).value,
      albumId: this.editForm.get(['albumId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImageSf>>) {
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

  trackTrackById(index: number, item: ITrackSf) {
    return item.id;
  }

  trackPlaylistById(index: number, item: IPlaylistSf) {
    return item.id;
  }

  trackArtistById(index: number, item: IArtistSf) {
    return item.id;
  }

  trackAlbumById(index: number, item: IAlbumSf) {
    return item.id;
  }
}
