import { Moment } from 'moment';

export interface IFollowUser {
  id?: number;
  liked?: boolean;
  date?: Moment;
  followedLogin?: string;
  followedId?: number;
  userLogin?: string;
  userId?: number;
}

export class FollowUser implements IFollowUser {
  constructor(
    public id?: number,
    public liked?: boolean,
    public date?: Moment,
    public followedLogin?: string,
    public followedId?: number,
    public userLogin?: string,
    public userId?: number
  ) {
    this.liked = this.liked || false;
  }
}
