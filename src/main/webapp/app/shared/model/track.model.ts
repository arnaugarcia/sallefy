import { IGenre } from 'app/shared/model/genre.model';
import { IUser, IUserSimplified } from 'app/core/user/user.model';

export interface ITrack {
  id?: number;
  name?: string;
  url?: string;
  thumbnail?: string;
  liked?: boolean;
  likes?: number;
  duration?: number;
  color?: string;
  owner?: IUserSimplified;
  genres?: IGenre[];
}

export class Track implements ITrack {
  constructor(
    public id?: number,
    public name?: string,
    public url?: string,
    public thumbnail?: string,
    public liked?: boolean,
    public likes?: number,
    public duration?: number,
    public color?: string,
    public owner?: IUser,
    public genres?: IGenre[]
  ) {}
}
