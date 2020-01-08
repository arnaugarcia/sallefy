import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[sfImageCheck]'
})
export class ImageCheckDirective {
  constructor(elementRef: ElementRef) {
    console.error(elementRef);
  }
}
