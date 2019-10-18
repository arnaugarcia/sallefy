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

  ngOnInit() {
    this.overlayService.overlayClicked.subscribe(() => {
      this.show = false;
    });
  }
  toggleShowNotifications() {
    this.show = !this.show;
  }
}
