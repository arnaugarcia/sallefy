import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  private reloadWidget = new BehaviorSubject<string>('');
  reloadWidget$: Observable<string> = this.reloadWidget.asObservable();

  reload(widget: string): void {
    this.reloadWidget.next(widget);
  }
}
