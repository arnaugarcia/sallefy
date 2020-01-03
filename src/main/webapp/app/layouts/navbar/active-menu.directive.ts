import { Directive, ElementRef, Input, OnInit, Renderer } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[sfActiveMenu]'
})
export class ActiveMenuDirective implements OnInit {
  @Input() sfActiveMenu?: string;

  constructor(private el: ElementRef, private renderer: Renderer, private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateActiveFlag(event.lang);
    });
    this.updateActiveFlag(this.translateService.currentLang);
  }

  updateActiveFlag(selectedLanguage: string): void {
    if (this.sfActiveMenu === selectedLanguage) {
      this.renderer.setElementClass(this.el.nativeElement, 'active', true);
    } else {
      this.renderer.setElementClass(this.el.nativeElement, 'active', false);
    }
  }
}
