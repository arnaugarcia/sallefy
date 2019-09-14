import { ILikeAlbum } from 'app/shared/model/like-album.model';
import { ITrack } from 'app/shared/model/track.model';

export interface IAlbum {
  id?: number;
  title?: string;
  year?: number;
  thumbnail?: string;
  totalTracks?: number;
  likeAlbums?: ILikeAlbum[];
  userLogin?: string;
  userId?: number;
  tracks?: ITrack[];
}

export class Album implements IAlbum {
  constructor(
    public id?: number,
    public title?: string,
    public year?: number,
    public thumbnail?: string,
    public totalTracks?: number,
    public likeAlbums?: ILikeAlbum[],
    public userLogin?: string,
    public userId?: number,
    public tracks?: ITrack[]
  ) {}
}
