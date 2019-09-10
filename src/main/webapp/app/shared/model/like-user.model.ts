import { Moment } from 'moment';

export interface ILikeUser {
  id?: number;
  liked?: boolean;
  date?: Moment;
  likedUserLogin?: string;
  likedUserId?: number;
  userLogin?: string;
  userId?: number;
}

export class LikeUser implements ILikeUser {
  constructor(
    public id?: number,
    public liked?: boolean,
    public date?: Moment,
    public likedUserLogin?: string,
    public likedUserId?: number,
    public userLogin?: string,
    public userId?: number
  ) {
    this.liked = this.liked || false;
  }
}
