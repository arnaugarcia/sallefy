import { Moment } from 'moment';
import { ILikeTrack } from 'app/shared/model/like-track.model';
import { IPlaylistSf } from 'app/shared/model/playlist-sf.model';
import { IAlbumSf } from 'app/shared/model/album-sf.model';

export interface ITrackSf {
  id?: number;
  name?: string;
  rating?: string;
  url?: string;
  popularity?: string;
  thumbnail?: string;
  createdAt?: Moment;
  duration?: number;
  primaryColor?: string;
  likeTracks?: ILikeTrack[];
  userLogin?: string;
  userId?: number;
  playlists?: IPlaylistSf[];
  albums?: IAlbumSf[];
}

export class TrackSf implements ITrackSf {
  constructor(
    public id?: number,
    public name?: string,
    public rating?: string,
    public url?: string,
    public popularity?: string,
    public thumbnail?: string,
    public createdAt?: Moment,
    public duration?: number,
    public primaryColor?: string,
    public likeTracks?: ILikeTrack[],
    public userLogin?: string,
    public userId?: number,
    public playlists?: IPlaylistSf[],
    public albums?: IAlbumSf[]
  ) {}
}
