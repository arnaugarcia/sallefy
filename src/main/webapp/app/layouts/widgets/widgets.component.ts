import { AfterViewInit, Component, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { WidgetsService } from 'app/layouts/widgets/widgets.service';

@Component({
  selector: 'sf-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements AfterViewInit, OnDestroy {
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private widgetsService: WidgetsService) {}
}
