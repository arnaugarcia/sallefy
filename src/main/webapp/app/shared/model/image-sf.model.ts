export interface IImageSf {
  id?: number;
  url?: string;
  height?: number;
  reference?: string;
  thumbnail?: boolean;
  cover?: boolean;
  width?: number;
  albumTitle?: string;
  albumId?: number;
  artistName?: string;
  artistId?: number;
  playlistName?: string;
  playlistId?: number;
  trackName?: string;
  trackId?: number;
}

export class ImageSf implements IImageSf {
  constructor(
    public id?: number,
    public url?: string,
    public height?: number,
    public reference?: string,
    public thumbnail?: boolean,
    public cover?: boolean,
    public width?: number,
    public albumTitle?: string,
    public albumId?: number,
    public artistName?: string,
    public artistId?: number,
    public playlistName?: string,
    public playlistId?: number,
    public trackName?: string,
    public trackId?: number
  ) {
    this.thumbnail = this.thumbnail || false;
    this.cover = this.cover || false;
  }
}
