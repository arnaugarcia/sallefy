import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  // TODO: This service should implement a logic to remove, add or reload widgets of the aside

  reload(selector: string): void {}

  add(selector: string): void {}

  remove(selector: string): void {}
}
