import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sfWidgets]'
})
export class WidgetsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
