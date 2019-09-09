import { IImageSf } from 'app/shared/model/image-sf.model';
import { IGenre } from 'app/shared/model/genre.model';

export interface IArtistSf {
  id?: number;
  name?: string;
  reference?: string;
  photo?: string;
  followers?: number;
  biography?: any;
  images?: IImageSf[];
  genres?: IGenre[];
}

export class ArtistSf implements IArtistSf {
  constructor(
    public id?: number,
    public name?: string,
    public reference?: string,
    public photo?: string,
    public followers?: number,
    public biography?: any,
    public images?: IImageSf[],
    public genres?: IGenre[]
  ) {}
}
