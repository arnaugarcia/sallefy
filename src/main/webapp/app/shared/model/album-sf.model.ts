import { IImageSf } from 'app/shared/model/image-sf.model';
import { IArtistSf } from 'app/shared/model/artist-sf.model';

export interface IAlbumSf {
  id?: number;
  title?: string;
  reference?: string;
  year?: number;
  totalTracks?: number;
  images?: IImageSf[];
  artists?: IArtistSf[];
}

export class AlbumSf implements IAlbumSf {
  constructor(
    public id?: number,
    public title?: string,
    public reference?: string,
    public year?: number,
    public totalTracks?: number,
    public images?: IImageSf[],
    public artists?: IArtistSf[]
  ) {}
}
