import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageHelper {
  private renderer: Renderer2;

  constructor(private translateService: TranslateService, rootRenderer: RendererFactory2) {
    this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
    });
  }
}
