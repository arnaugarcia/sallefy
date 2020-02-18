import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITrack } from 'app/shared/model/track.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private queueSource = new BehaviorSubject<ITrack[]>([]);
  queue$ = this.queueSource.asObservable();

  private playlistOpenSource = new BehaviorSubject(false);
  playlistOpenStatus = this.playlistOpenSource.asObservable();

  playlistOpen(value: boolean): void {
    this.playlistOpenSource.next(value);
  }

  play(): void {}

  pause(): void {}

  prev(): void {}

  next(): ITrack[] {
    const queue = this.queueSource.getValue();
    queue.shift();
    this.queueSource.next(queue);
    return queue;
  }

  add(tracks: ITrack[]): ITrack[] {
    const queue = this.queueSource.getValue();
    queue.push(...tracks);
    this.queueSource.next(queue);
    return queue;
  }

  remove(tracks: ITrack[]): ITrack[] {
    return [];
  }

  clear(): void {}
}
