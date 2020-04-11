import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITrack, Track } from 'app/shared/model/track.model';
import { IPlaylist } from 'app/shared/model/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private historySource = new BehaviorSubject<ITrack[]>([]);
  history$ = this.historySource.asObservable();

  private currentTrack = new BehaviorSubject<ITrack>(new Track());
  currentTrack$ = this.currentTrack.asObservable();

  private queueSource = new BehaviorSubject<ITrack[]>([]);
  queue$ = this.queueSource.asObservable();

  private playlistOpenSource = new BehaviorSubject(false);
  playlistOpenStatus = this.playlistOpenSource.asObservable();

  playlistOpen(value: boolean): void {
    this.playlistOpenSource.next(value);
  }

  /**
   * Pushes a track to the history and queue. And updates the current track
   * @param track the track to play
   */
  play(track: ITrack): void {
    this.currentTrack.next(track);
    const queue = this.queueSource.getValue();
    queue.unshift(track);
    const history = this.historySource.getValue();
    history.unshift(track);
  }

  prev(): void {
    /* const queue = this.queueSource.getValue();
    const history = this.historySource.getValue();
    queue.unshift(history[history.length]);
    this.queueSource.next(queue);
    this.play(queue[0]); */
  }

  next(): void {
    /* const queue = this.queueSource.getValue();
    queue.shift();
    this.queueSource.next(queue);
    this.play(queue[0]); */
  }

  addAll(tracks: ITrack[]): ITrack[] {
    const queue = this.queueSource.getValue();
    queue.push(...tracks);
    this.queueSource.next(queue);
    return queue;
  }

  add(track: ITrack): ITrack[] {
    const queue = this.queueSource.getValue();
    queue.push(track);
    this.queueSource.next(queue);
    return queue;
  }

  remove(track: ITrack): ITrack[] {
    const queue = this.queueSource.getValue();
    const index = queue.indexOf(track);
    queue.slice(index, 1);
    this.queueSource.next(queue);
    return queue;
  }

  clear(): void {
    this.queueSource.next([]);
  }

  playPlaylist(playlist: IPlaylist): void {
    if (!playlist.tracks) {
      return;
    }
    this.addAll(playlist.tracks);
    const queue = this.queueSource.getValue();
    this.play(queue[0]);
  }
}
