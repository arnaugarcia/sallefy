import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { WidgetsDirective } from 'app/layouts/widgets/widgets.directive';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sf-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit, AfterViewInit, OnDestroy {
  public widgets: Type<WidgetBase>[] = [];

  @ViewChild(WidgetsDirective, { static: true })
  private anchorPoint: WidgetsDirective | undefined;

  private widgetContainerRef: ViewContainerRef | undefined;

  private widgets$: Subscription = new Subscription();

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private widgetsService: WidgetsService) {}

  ngOnInit(): void {
    this.widgets$ = this.widgetsService.widgets$.subscribe((widgets: Type<WidgetBase>[]) => {
      this.operateChangeInView(widgets);
    });
  }

  private operateChangeInView(widgets: Type<WidgetBase>[]): void {
    // There is a change in the array can be an addition or subtraction
    const addition = widgets.find(x => !this.widgets.includes(x));
    if (addition) {
      this.loadComponent(addition);
      this.widgets.push(addition);
    } else {
      const subtraction = this.widgets.find(x => !widgets.includes(x));
      this.removeComponent(subtraction);
      this.widgets.splice(this.widgets.indexOf(subtraction), 1);
    }
  }

  ngAfterViewInit(): void {
    if (this.anchorPoint) {
      this.widgetContainerRef = this.anchorPoint.viewContainerRef;
    }
  }

  ngOnDestroy(): void {
    this.widgets$.unsubscribe();
  }

  private loadComponent(widget: Type<WidgetBase>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(widget);
    if (this.widgetContainerRef) {
      this.widgetContainerRef.createComponent(componentFactory);
    }
  }

  private removeComponent(widget: Type<WidgetBase>): void {
    if (this.widgetContainerRef) {
      this.widgetContainerRef.remove(this.widgets.indexOf(widget));
    }
  }
}
