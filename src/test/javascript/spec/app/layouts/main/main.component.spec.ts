import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of, Subject } from 'rxjs';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';

import { SfMainComponent } from 'app/layouts/main/main.component';
import { SallefyTestModule } from '../../../test.module';
import { MockRouter } from '../../../helpers/mock-route.service';

describe('Component Tests', () => {
  describe('SfMainComponent', () => {
    let comp: SfMainComponent;
    let fixture: ComponentFixture<SfMainComponent>;
    let router: MockRouter;
    const routerEventsSubject = new Subject<RouterEvent>();
    let titleService: Title;
    let translateService: TranslateService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [SallefyTestModule, TranslateModule.forRoot()],
        declarations: [SfMainComponent],
        providers: [Title]
      })
        .overrideTemplate(SfMainComponent, '')
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SfMainComponent);
      comp = fixture.componentInstance;
      router = TestBed.get(Router);
      router.setEvents(routerEventsSubject.asObservable());
      titleService = TestBed.get(Title);
      translateService = TestBed.get(TranslateService);
    });

    describe('page title', () => {
      let routerState: any;
      const defaultPageTitle = 'global.title';
      const parentRoutePageTitle = 'parentTitle';
      const childRoutePageTitle = 'childTitle';
      const navigationEnd = new NavigationEnd(1, '', '');
      const langChangeEvent: LangChangeEvent = { lang: 'en', translations: null };

      beforeEach(() => {
        routerState = { snapshot: { root: {} } };
        router.setRouterState(routerState);
        spyOn(translateService, 'get').and.callFake((key: string) => {
          return of(key + ' translated');
        });
        spyOn(titleService, 'setTitle');
        comp.ngOnInit();
      });

      describe('navigation end', () => {
        it('should set page title to default title if pageTitle is missing on routes', () => {
          // WHEN
          routerEventsSubject.next(navigationEnd);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(defaultPageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(defaultPageTitle + ' translated');
        });

        it('should set page title to root route pageTitle if there is no child routes', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };

          // WHEN
          routerEventsSubject.next(navigationEnd);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(parentRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle + ' translated');
        });

        it('should set page title to child route pageTitle if child routes exist and pageTitle is set for child route', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
          routerState.snapshot.root.firstChild = { data: { pageTitle: childRoutePageTitle } };

          // WHEN
          routerEventsSubject.next(navigationEnd);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(childRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(childRoutePageTitle + ' translated');
        });

        it('should set page title to parent route pageTitle if child routes exists but pageTitle is not set for child route data', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
          routerState.snapshot.root.firstChild = { data: {} };

          // WHEN
          routerEventsSubject.next(navigationEnd);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(parentRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle + ' translated');
        });

        it('should set page title to parent route pageTitle if child routes exists but data is not set for child route', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
          routerState.snapshot.root.firstChild = {};

          // WHEN
          routerEventsSubject.next(navigationEnd);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(parentRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle + ' translated');
        });
      });

      describe('language change', () => {
        it('should set page title to default title if pageTitle is missing on routes', () => {
          // WHEN
          translateService.onLangChange.emit(langChangeEvent);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(defaultPageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(defaultPageTitle + ' translated');
        });

        it('should set page title to root route pageTitle if there is no child routes', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };

          // WHEN
          translateService.onLangChange.emit(langChangeEvent);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(parentRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle + ' translated');
        });

        it('should set page title to child route pageTitle if child routes exist and pageTitle is set for child route', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
          routerState.snapshot.root.firstChild = { data: { pageTitle: childRoutePageTitle } };

          // WHEN
          translateService.onLangChange.emit(langChangeEvent);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(childRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(childRoutePageTitle + ' translated');
        });

        it('should set page title to parent route pageTitle if child routes exists but pageTitle is not set for child route data', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
          routerState.snapshot.root.firstChild = { data: {} };

          // WHEN
          translateService.onLangChange.emit(langChangeEvent);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(parentRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle + ' translated');
        });

        it('should set page title to parent route pageTitle if child routes exists but data is not set for child route', () => {
          // GIVEN
          routerState.snapshot.root.data = { pageTitle: parentRoutePageTitle };
          routerState.snapshot.root.firstChild = {};

          // WHEN
          translateService.onLangChange.emit(langChangeEvent);

          // THEN
          expect(translateService.get).toHaveBeenCalledWith(parentRoutePageTitle);
          expect(titleService.setTitle).toHaveBeenCalledWith(parentRoutePageTitle + ' translated');
        });
      });
    });
  });
});
