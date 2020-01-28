import { Injectable } from '@angular/core';
import { WidgetBase } from 'app/layouts/widgets/widget-base';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  // TODO: This service should implement a logic to remove, add or reload widgets of the aside

  reload(widget: WidgetBase): void {}

  add(widget: WidgetBase): void {}

  remove(widget: WidgetBase): void {}
}
