import { Moment } from 'moment';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { IAlbumSf } from 'app/shared/model/album-sf.model';

export interface ITrackSf {
  id?: number;
  name?: string;
  rating?: number;
  url?: string;
  thumbnail?: string;
  createdAt?: Moment;
  duration?: number;
  primaryColor?: string;
  userLogin?: string;
  userId?: number;
  playlists?: IPlaylistSf[];
  albums?: IAlbumSf[];
}

export class TrackSf implements ITrackSf {
  constructor(
    public id?: number,
    public name?: string,
    public rating?: number,
    public url?: string,
    public thumbnail?: string,
    public createdAt?: Moment,
    public duration?: number,
    public primaryColor?: string,
    public userLogin?: string,
    public userId?: number,
    public playlists?: IPlaylistSf[],
    public albums?: IAlbumSf[]
  ) {}
}
