import { Injectable, Type } from '@angular/core';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  // TODO: This service should implement a logic to remove, add or reload widgets of the aside

  private widgets = new BehaviorSubject<Type<WidgetBase>[]>([]);
  widgets$: Observable<Type<WidgetBase>[]> = this.widgets.asObservable();

  reload(widget: Type<WidgetBase>): void {
    // TODO: find widget and execute reload() method
  }

  add(widget: Type<WidgetBase>): void {
    const widgets = this.widgets.getValue();
    widgets.push(widget);
    this.widgets.next(widgets);
  }

  remove(widget: Type<WidgetBase>): void {
    const widgets = this.widgets.getValue();
    const index = widgets.indexOf(widget);
    widgets.splice(index, 1);
    this.widgets.next(widgets);
  }
}
