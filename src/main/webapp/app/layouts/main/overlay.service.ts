import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayStatusSource = new BehaviorSubject(false);
  overlayStatus = this.overlayStatusSource.asObservable();

  constructor() {}

  changeStatus(value: boolean) {
    this.overlayStatusSource.next(value);
  }
}
