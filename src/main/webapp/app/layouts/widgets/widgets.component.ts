import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { WidgetsDirective } from 'app/layouts/widgets/widgets.directive';
import { GenresComponent } from 'app/layouts/widgets/genres/genres.component';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { TopTracksComponent } from 'app/layouts/widgets/top-tracks/top-tracks.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sf-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
// TODO: Create a WidgetBase in order to inherit reload() method to all widgets
// TODO: Make sure that the widgets doesn't create a memory leak
export class WidgetsComponent implements OnInit, AfterViewInit, OnDestroy {
  public widgets: Type<WidgetBase>[] = [];

  @ViewChild(WidgetsDirective, { static: true })
  private anchorPoint: WidgetsDirective | undefined;

  private widgetContainerRef: ViewContainerRef | undefined;

  private widgets$: Subscription = new Subscription();

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private widgetsService: WidgetsService) {}

  ngOnInit(): void {
    this.widgets$ = this.widgetsService.widgets$.subscribe((widgets: Type<WidgetBase>[]) => {
      this.widgets = widgets;
    });
  }

  ngAfterViewInit(): void {
    if (this.anchorPoint) {
      this.widgetContainerRef = this.anchorPoint.viewContainerRef;
    }
  }

  ngOnDestroy(): void {
    this.widgets$.unsubscribe();
  }

  removeTracks(): void {
    this.widgetsService.remove(TopTracksComponent);
  }

  removeGenres(): void {
    this.widgetsService.remove(GenresComponent);
  }

  addGenres(): void {
    this.widgetsService.add(GenresComponent);
  }

  addTracks(): void {
    this.widgetsService.add(TopTracksComponent);
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
