import { ILikeAlbum } from 'app/shared/model/like-album.model';
import { ITrackSf } from 'app/shared/model/track-sf.model';

export interface IAlbumSf {
  id?: number;
  title?: string;
  year?: number;
  thumbnail?: string;
  totalTracks?: number;
  likeAlbums?: ILikeAlbum[];
  userLogin?: string;
  userId?: number;
  tracks?: ITrackSf[];
}

export class AlbumSf implements IAlbumSf {
  constructor(
    public id?: number,
    public title?: string,
    public year?: number,
    public thumbnail?: string,
    public totalTracks?: number,
    public likeAlbums?: ILikeAlbum[],
    public userLogin?: string,
    public userId?: number,
    public tracks?: ITrackSf[]
  ) {}
}
