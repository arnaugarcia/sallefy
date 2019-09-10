import { IImageSf } from 'app/shared/model/image-sf.model';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';

export interface ITrackSf {
  id?: number;
  name?: string;
  raiting?: number;
  url?: string;
  reference?: string;
  duration?: number;
  primaryColor?: string;
  images?: IImageSf[];
  playlists?: IPlaylistSf[];
}

export class TrackSf implements ITrackSf {
  constructor(
    public id?: number,
    public name?: string,
    public raiting?: number,
    public url?: string,
    public reference?: string,
    public duration?: number,
    public primaryColor?: string,
    public images?: IImageSf[],
    public playlists?: IPlaylistSf[]
  ) {}
}
