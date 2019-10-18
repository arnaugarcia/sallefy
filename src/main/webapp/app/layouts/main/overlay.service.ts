import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private overlayClickedSource = new BehaviorSubject(false);
  overlayClicked = this.overlayClickedSource.asObservable();

  private overlayStatusSource = new BehaviorSubject(false);
  overlayStatus = this.overlayStatusSource.asObservable();

  constructor() {}

  changeStatus(value: boolean) {
    this.overlayStatusSource.next(value);
  }

  clicked() {
    this.overlayClickedSource.next(true);
    this.overlayClickedSource.next(false);
  }
}
