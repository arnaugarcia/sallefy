import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { JhiLanguageHelper } from 'app/core/language/language.helper';
import { OverlayService } from 'app/layouts/main/overlay.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'sf-main',
  templateUrl: './main.component.html'
})
export class SfMainComponent implements OnInit {
  constructor(
    private jhiLanguageHelper: JhiLanguageHelper,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private overlayService: OverlayService
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'sallefyApp';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.overlayService.overlayStatus.subscribe((overlayStatus: boolean) => {
      if (overlayStatus) {
        this.document.body.classList.add('off-canvas-overlay-on');
      } else {
        this.document.body.classList.remove('off-canvas-overlay-on');
      }
    });
  }

  overlayClicked() {
    this.overlayService.clicked();
  }
}
