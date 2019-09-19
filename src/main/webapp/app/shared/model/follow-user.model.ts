import { Moment } from 'moment';

export interface IFollowUser {
  id?: number;
  date?: Moment;
  followedLogin?: string;
  followedId?: number;
  userLogin?: string;
  userId?: number;
}

export class FollowUser implements IFollowUser {
  constructor(
    public id?: number,
    public date?: Moment,
    public followedLogin?: string,
    public followedId?: number,
    public userLogin?: string,
    public userId?: number
  ) {}
}
