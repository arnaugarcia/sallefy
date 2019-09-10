import { ITrackSf } from 'app/shared/model/track-sf.model';

export interface IAlbumSf {
  id?: number;
  title?: string;
  year?: number;
  thumbnail?: string;
  totalTracks?: number;
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
    public userLogin?: string,
    public userId?: number,
    public tracks?: ITrackSf[]
  ) {}
}
