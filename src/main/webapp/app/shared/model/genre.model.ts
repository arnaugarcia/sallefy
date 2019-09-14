import { ITrack } from 'app/shared/model/track.model';

export interface IGenre {
  id?: number;
  name?: string;
  popularity?: number;
  tracks?: ITrack[];
}

export class Genre implements IGenre {
  constructor(public id?: number, public name?: string, public popularity?: number, public tracks?: ITrack[]) {}
}
