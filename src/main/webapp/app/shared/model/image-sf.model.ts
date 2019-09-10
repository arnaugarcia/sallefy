export interface IImageSf {
  id?: number;
  url?: string;
  height?: number;
  thumbnail?: boolean;
  cover?: boolean;
  width?: number;
  trackId?: number;
  playlistId?: number;
  artistId?: number;
  albumId?: number;
}

export class ImageSf implements IImageSf {
  constructor(
    public id?: number,
    public url?: string,
    public height?: number,
    public thumbnail?: boolean,
    public cover?: boolean,
    public width?: number,
    public trackId?: number,
    public playlistId?: number,
    public artistId?: number,
    public albumId?: number
  ) {
    this.thumbnail = this.thumbnail || false;
    this.cover = this.cover || false;
  }
}
