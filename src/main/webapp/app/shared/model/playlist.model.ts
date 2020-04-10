import { ITrack } from 'app/shared/model/track.model';
import { IUser } from 'app/core/user/user.model';

export interface IPlaylist {
  id?: number;
  name?: string;
  collaborative?: boolean;
  description?: any;
  primaryColor?: string;
  cover?: string;
  thumbnail?: string;
  publicAccessible?: boolean;
  numberSongs?: number;
  followed?: boolean;
  followers?: number;
  rating?: number;
  owner?: IUser;
  tracks?: ITrack[];
}

export class Playlist implements IPlaylist {
  constructor(
    public id?: number,
    public name?: string,
    public collaborative?: boolean,
    public description?: any,
    public primaryColor?: string,
    public cover?: string,
    public thumbnail?: string,
    public publicAccessible?: boolean,
    public numberSongs?: number,
    public followed?: boolean,
    public followers?: number,
    public rating?: number,
    public owner?: IUser,
    public tracks?: ITrack[]
  ) {
    this.collaborative = this.collaborative || false;
    this.publicAccessible = this.publicAccessible || false;
    this.followed = this.followed || false;
  }
}
