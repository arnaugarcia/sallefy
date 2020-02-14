import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'app/layouts/player/player.service';

@Component({
  selector: 'sf-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('media', { static: false })
  private audioPlayerRef: ElementRef | undefined;
  private audioPlayer: HTMLAudioElement | undefined;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {}

  showPlaylist(): void {
    this.playerService.playlistOpen(true);
  }

  ngAfterViewInit(): void {
    if (this.audioPlayerRef) {
      this.audioPlayer = this.audioPlayerRef.nativeElement as HTMLAudioElement;
      this.audioPlayer.play();
    }
  }
}
