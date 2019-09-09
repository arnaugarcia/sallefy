import { IArtistSf } from 'app/shared/model/artist-sf.model';
import { IImageSf } from 'app/shared/model/image-sf.model';

export interface IAlbumSf {
  id?: number;
  title?: string;
  reference?: string;
  totalTracks?: number;
  artists?: IArtistSf[];
  images?: IImageSf[];
}

export class AlbumSf implements IAlbumSf {
  constructor(
    public id?: number,
    public title?: string,
    public reference?: string,
    public totalTracks?: number,
    public artists?: IArtistSf[],
    public images?: IImageSf[]
  ) {}
}
