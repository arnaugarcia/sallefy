import { IArtistSf } from 'app/shared/model/artist-sf.model';

export interface IGenre {
  id?: number;
  name?: string;
  artists?: IArtistSf[];
}

export class Genre implements IGenre {
  constructor(public id?: number, public name?: string, public artists?: IArtistSf[]) {}
}
