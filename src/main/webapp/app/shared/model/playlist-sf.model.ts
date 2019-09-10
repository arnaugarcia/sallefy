import { ITrackSf } from 'app/shared/model/track-sf.model';

export interface IPlaylistSf {
  id?: number;
  name?: string;
  collaborative?: boolean;
  description?: any;
  primaryColor?: string;
  cover?: string;
  thumbnail?: string;
  publicAccessible?: boolean;
  numberSongs?: number;
  followers?: number;
  rating?: number;
  userLogin?: string;
  userId?: number;
  tracks?: ITrackSf[];
}

export class PlaylistSf implements IPlaylistSf {
  constructor(
    public id?: number,
    public name?: string,
    public collaborative?: boolean,
    public description?: any,
    public primaryColor?: string,
    public cover?: string,
    public thumbnail?: string,
    public publicAccessible?: boolean,
    public numberSongs?: number,
    public followers?: number,
    public rating?: number,
    public userLogin?: string,
    public userId?: number,
    public tracks?: ITrackSf[]
  ) {
    this.collaborative = this.collaborative || false;
    this.publicAccessible = this.publicAccessible || false;
  }
}
