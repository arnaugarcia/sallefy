import { IImageSf } from 'app/shared/model/image-sf.model';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { IAlbumSf } from 'app/shared/model/album-sf.model';

export interface ITrackSf {
  id?: number;
  name?: string;
  rating?: number;
  url?: string;
  reference?: string;
  duration?: number;
  primaryColor?: string;
  images?: IImageSf[];
  playlists?: IPlaylistSf[];
  albums?: IAlbumSf[];
}

export class TrackSf implements ITrackSf {
  constructor(
    public id?: number,
    public name?: string,
    public rating?: number,
    public url?: string,
    public reference?: string,
    public duration?: number,
    public primaryColor?: string,
    public images?: IImageSf[],
    public playlists?: IPlaylistSf[],
    public albums?: IAlbumSf[]
  ) {}
}
