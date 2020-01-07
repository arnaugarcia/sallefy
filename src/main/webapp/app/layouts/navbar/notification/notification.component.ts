import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'app/layouts/main/overlay.service';

@Component({
  selector: 'sf-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  show = false;

  constructor(private overlayService: OverlayService) {}

  ngOnInit(): void {
    this.overlayService.overlayClicked.subscribe(() => {
      this.show = false;
    });
  }
  toggleShowNotifications(): void {
    this.show = !this.show;
  }
}
