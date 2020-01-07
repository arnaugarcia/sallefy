import { Component, OnInit } from '@angular/core';
import { ITrack } from 'app/shared/model/track.model';
import { TrackService } from 'app/shared/services/track.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sf-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  private tracks: ITrack[] = [];
  groupedTracks: ITrack[][] = [];

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  };
  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.trackService.query({ size: 25 }).subscribe((response: HttpResponse<ITrack[]>) => {
      this.tracks = response.body != null ? response.body : [];
      this.groupedTracks = this.chunkArray(this.tracks, 5);
    });
  }

  private chunkArray(myArray: ITrack[], chunkSize: number): ITrack[][] {
    const results = [];

    while (myArray.length) {
      results.push(myArray.splice(0, chunkSize));
    }

    return results;
  }
}
