import { Moment } from 'moment';

export interface ILikeAlbum {
  id?: number;
  liked?: boolean;
  date?: Moment;
  userLogin?: string;
  userId?: number;
  albumTitle?: string;
  albumId?: number;
}

export class LikeAlbum implements ILikeAlbum {
  constructor(
    public id?: number,
    public liked?: boolean,
    public date?: Moment,
    public userLogin?: string,
    public userId?: number,
    public albumTitle?: string,
    public albumId?: number
  ) {
    this.liked = this.liked || false;
  }
}
