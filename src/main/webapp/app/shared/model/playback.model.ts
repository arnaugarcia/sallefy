import { Moment } from 'moment';

export interface IPlayback {
  id?: number;
  ip?: string;
  latitude?: number;
  longitude?: number;
  date?: Moment;
  userLogin?: string;
  userId?: number;
  trackName?: string;
  trackId?: number;
}

export class Playback implements IPlayback {
  constructor(
    public id?: number,
    public ip?: string,
    public latitude?: number,
    public longitude?: number,
    public date?: Moment,
    public userLogin?: string,
    public userId?: number,
    public trackName?: string,
    public trackId?: number
  ) {}
}
