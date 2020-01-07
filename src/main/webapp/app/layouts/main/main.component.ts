import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, NavigationError, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AccountService } from 'app/core/auth/account.service';
import { OverlayService } from 'app/layouts/main/overlay.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'sf-main',
  templateUrl: './main.component.html'
})
export class SfMainComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private translateService: TranslateService,
    private overlayService: OverlayService,
    @Inject(DOCUMENT) private document: Document,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
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

  overlayClicked(): void {
    this.overlayService.clicked();

    this.translateService.onLangChange.subscribe(() => this.updateTitle());
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
