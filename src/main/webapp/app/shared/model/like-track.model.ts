export interface ILike {
  liked?: boolean;
}

export class LikeTrack implements ILike {
  constructor(public liked?: boolean) {
    this.liked = this.liked || false;
  }
}
