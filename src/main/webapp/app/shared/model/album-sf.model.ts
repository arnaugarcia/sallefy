import { IImageSf } from 'app/shared/model/image-sf.model';
import { ITrackSf } from 'app/shared/model/track-sf.model';

export interface IAlbumSf {
  id?: number;
  title?: string;
  reference?: string;
  year?: number;
  totalTracks?: number;
  images?: IImageSf[];
  tracks?: ITrackSf[];
}

export class AlbumSf implements IAlbumSf {
  constructor(
    public id?: number,
    public title?: string,
    public reference?: string,
    public year?: number,
    public totalTracks?: number,
    public images?: IImageSf[],
    public tracks?: ITrackSf[]
  ) {}
}
