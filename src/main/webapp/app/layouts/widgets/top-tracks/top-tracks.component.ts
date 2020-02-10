import { Component, OnInit } from '@angular/core';
import { WidgetBase } from 'app/layouts/widgets/widget-base';

@Component({
  selector: 'sf-top-tracks',
  templateUrl: './top-tracks.component.html',
  styleUrls: ['./top-tracks.component.scss']
})
export class TopTracksComponent implements OnInit, WidgetBase {
  ngOnInit(): void {}

  public reload(): void {}
}
