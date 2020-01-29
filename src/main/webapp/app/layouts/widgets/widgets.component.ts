import { Component, ComponentFactoryResolver, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { WidgetsDirective } from 'app/layouts/widgets/widgets.directive';
import { GenresComponent } from 'app/layouts/widgets/genres/genres.component';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';
import { WidgetBase } from 'app/layouts/widgets/widget-base';
import { TopTracksComponent } from 'app/layouts/widgets/top-tracks/top-tracks.component';

@Component({
  selector: 'sf-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
// TODO: Create a WidgetBase in order to inherit reload() method to all widgets
// TODO: Make sure that the widgets doesn't create a memory leak
export class WidgetsComponent implements OnInit, OnDestroy {
  @ViewChild(WidgetsDirective, { static: true })
  private widgetsAnchor?: WidgetsDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private widgetsService: WidgetsService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    console.warn('Widgets init');
    this.widgetsService.widgets$.subscribe((widgets: Type<WidgetBase>[]) => {
      console.warn('New widgets loaded!');
      console.warn(widgets);
      widgets.forEach((widget: Type<WidgetBase>) => {
        this.loadComponent(widget);
      });
    });
  }

  private loadComponent(widget: Type<WidgetBase>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(widget);
    const viewContainerRef = this.widgetsAnchor.viewContainerRef;

    viewContainerRef.createComponent(componentFactory);
  }

  addGenres(): void {
    this.widgetsService.add(GenresComponent);
  }

  addTracks(): void {
    this.widgetsService.add(TopTracksComponent);
  }
}
