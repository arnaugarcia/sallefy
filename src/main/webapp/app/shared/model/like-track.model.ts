import { Moment } from 'moment';

export interface ILikeTrack {
  id?: number;
  liked?: boolean;
  date?: Moment;
  trackName?: string;
  trackId?: number;
}

export class LikeTrack implements ILikeTrack {
  constructor(public id?: number, public liked?: boolean, public date?: Moment, public trackName?: string, public trackId?: number) {
    this.liked = this.liked || false;
  }
}
