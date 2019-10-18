import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  show = false;

  constructor() {}

  ngOnInit() {}

  toggleShowProfile() {
    this.show = !this.show;
  }
}
