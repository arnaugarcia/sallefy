import { IImageSf } from 'app/shared/model/image-sf.model';
import { ITrackSf } from 'app/shared/model/track-sf.model';

export interface IPlaylistSf {
  id?: number;
  name?: string;
  collaborative?: boolean;
  reference?: string;
  description?: any;
  primaryColor?: string;
  publicAccessible?: boolean;
  numberSongs?: number;
  followers?: number;
  rating?: number;
  ownerId?: number;
  images?: IImageSf[];
  tracks?: ITrackSf[];
}

export class PlaylistSf implements IPlaylistSf {
  constructor(
    public id?: number,
    public name?: string,
    public collaborative?: boolean,
    public reference?: string,
    public description?: any,
    public primaryColor?: string,
    public publicAccessible?: boolean,
    public numberSongs?: number,
    public followers?: number,
    public rating?: number,
    public ownerId?: number,
    public images?: IImageSf[],
    public tracks?: ITrackSf[]
  ) {
    this.collaborative = this.collaborative || false;
    this.publicAccessible = this.publicAccessible || false;
  }
}
