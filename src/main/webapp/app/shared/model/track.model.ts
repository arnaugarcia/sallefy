import { Moment } from 'moment';
import { IGenre } from 'app/shared/model/genre.model';
import { IPlayback } from 'app/shared/model/playback.model';
import { ILikeTrack } from 'app/shared/model/like-track.model';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { IAlbum } from 'app/shared/model/album.model';

export interface ITrack {
  id?: number;
  name?: string;
  rating?: string;
  url?: string;
  popularity?: string;
  thumbnail?: string;
  createdAt?: Moment;
  released?: Moment;
  duration?: number;
  color?: string;
  userLogin?: string;
  userId?: number;
  genres?: IGenre[];
  playbacks?: IPlayback[];
  likeTracks?: ILikeTrack[];
  playlists?: IPlaylist[];
  albums?: IAlbum[];
}

export class Track implements ITrack {
  constructor(
    public id?: number,
    public name?: string,
    public rating?: string,
    public url?: string,
    public popularity?: string,
    public thumbnail?: string,
    public createdAt?: Moment,
    public released?: Moment,
    public duration?: number,
    public color?: string,
    public userLogin?: string,
    public userId?: number,
    public genres?: IGenre[],
    public playbacks?: IPlayback[],
    public likeTracks?: ILikeTrack[],
    public playlists?: IPlaylist[],
    public albums?: IAlbum[]
  ) {}
}
