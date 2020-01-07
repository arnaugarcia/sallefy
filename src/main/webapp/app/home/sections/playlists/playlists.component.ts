import { Component, OnInit } from '@angular/core';
import { PlaylistService } from 'app/entities/playlist/playlist.service';
import { IPlaylist } from 'app/shared/model/playlist.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'sf-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public playlists: IPlaylist[] = [];

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

  constructor(private playlistsService: PlaylistService) {}

  ngOnInit(): void {
    this.playlistsService.query({ size: 10 }).subscribe((response: HttpResponse<IPlaylist[]>) => {
      this.playlists = response.body != null ? response.body : [];
    });
  }
}
