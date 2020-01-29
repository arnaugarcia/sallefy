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
  public widgets: Type<WidgetBase>[] = [];
  @ViewChild(WidgetsDirective, { static: true })
  private widgetsAnchor?: WidgetsDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private widgetsService: WidgetsService) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    console.warn('Widgets init');
    this.widgetsService.widgets$.subscribe((widgets: Type<WidgetBase>[]) => {
      console.warn('New widgets loaded!', widgets);
      widgets.forEach((widget: Type<WidgetBase>) => {
        if (!this.widgets.includes(widget)) {
          this.loadComponent(widget);
        } else {
          const difference = this.widgets.filter(x => !widgets.includes(x));
          if (difference.length) {
            this.removeComponent(difference[0]);
            // difference.forEach((deleteWidget: Type<WidgetBase>) => this.widgets.slice(this.widgets.indexOf(deleteWidget), 1));
          }
        }
      });
    });
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
    const viewContainerRef = this.widgetsAnchor.viewContainerRef;
    viewContainerRef.createComponent(componentFactory);
    this.widgets.push(widget);
  }

  private removeComponent(widget: Type<WidgetBase>): void {
    const viewContainerRef = this.widgetsAnchor.viewContainerRef;
    viewContainerRef.remove(this.widgets.indexOf(widget));
    this.widgets.splice(this.widgets.indexOf(widget), 1);
  }
}
