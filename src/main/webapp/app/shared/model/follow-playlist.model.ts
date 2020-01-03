import { Moment } from 'moment';

export interface IFollowPlaylist {
  id?: number;
  date?: Moment;
  userLogin?: string;
  userId?: number;
  playlistName?: string;
  playlistId?: number;
}

export class FollowPlaylist implements IFollowPlaylist {
  constructor(
    public id?: number,
    public date?: Moment,
    public userLogin?: string,
    public userId?: number,
    public playlistName?: string,
    public playlistId?: number
  ) {}
}
