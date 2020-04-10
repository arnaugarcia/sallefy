import { Component, Input, ViewChild } from '@angular/core';
import { ITrack, Track } from 'app/shared/model/track.model';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { PlayerService } from 'app/layouts/player/player.service';
import { TrackService } from 'app/shared/services/track.service';
import { HttpResponse } from '@angular/common/http';
import { ILike } from 'app/shared/model/like.model';

@Component({
  selector: 'sf-track',
  template: ''
})
export class TrackBaseComponent {
  @Input()
  public track: ITrack = new Track();

  public hover = false;

  @ViewChild(ContextMenuComponent, { static: true })
  public basicMenu: ContextMenuComponent | undefined;

  constructor(private playerService: PlayerService, private trackService: TrackService) {}

  play(): void {
    this.playerService.play(this.track);
  }

  addToQueue(): void {
    this.playerService.add(this.track);
  }

  toggleLike(): void {
    this.trackService.toggleLike(this.track).subscribe((response: HttpResponse<ILike>) => {
      if (response.ok && response.body) {
        this.track.liked = response.body.liked;
      }
    });
  }

  openArtistProfile(): void {}
}
