import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playlistOpenSource = new BehaviorSubject(false);
  playlistOpenStatus = this.playlistOpenSource.asObservable();

  constructor() {}

  playlistOpen(value: boolean): void {
    this.playlistOpenSource.next(value);
  }
}
