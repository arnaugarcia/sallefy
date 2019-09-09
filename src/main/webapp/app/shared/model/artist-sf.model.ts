import { IImageSf } from 'app/shared/model/image-sf.model';

export interface IArtistSf {
  id?: number;
  name?: string;
  reference?: string;
  photo?: string;
  biography?: any;
  images?: IImageSf[];
}

export class ArtistSf implements IArtistSf {
  constructor(
    public id?: number,
    public name?: string,
    public reference?: string,
    public photo?: string,
    public biography?: any,
    public images?: IImageSf[]
  ) {}
}
