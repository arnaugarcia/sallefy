import { Component, Input, OnInit } from '@angular/core';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'sf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() private user: User;
  show = false;

  constructor() {}

  ngOnInit() {}

  toggleShowProfile() {
    this.show = !this.show;
  }
}
